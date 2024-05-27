import { useEffect, useState } from 'react';

const baseUrl = 'http://localhost:4000';

export default function App() {
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAttending, setIsAttending] = useState(false);

  useEffect(() => {
    // POST new guest to the guest list
    async function addGuestToList() {
      // Variable for the POST request
      const guestPost = {
        firstName: firstName,
        lastName: lastName,
        attending: false,
      };
      const response = await fetch(`${baseUrl}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(guestPost),
      });
      const data = await response.json();
      console.log(data);
    }
    addGuestToList().catch((error) => console.log(error));
  }, [guests]);

  useEffect(() => {
    // GET all guests from the guest list
    async function showGuestList() {
      const response = await fetch(`${baseUrl}/guests`);
      const data = await response.json();
      setGuests(data);
    }
    showGuestList().catch((error) => console.log(error));
  }, []);

  return (
    <div data-test-id="guest">
      <form onSubmit={(event) => event.preventDefault()}>
        <input
          id="FirstName"
          value={firstName}
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
        <label htmlFor="FirstName">First name</label>
        <input
          id="LastName"
          value={lastName}
          onChange={(event) => setLastName(event.currentTarget.value)}
          onKeyDown={(event) => {
            const newGuest = {
              firstName: firstName,
              lastName: lastName,
            };
            if (event.key === 'Enter') {
              const newGuestsList = [...guests];
              newGuestsList.push(newGuest);
              setGuests(newGuestsList);
            }
          }}
        />
        <label htmlFor="LastName">Last name</label>
      </form>
      {/* <button
        onClick={(event) => {
          const newGuest = {
            keyId: guests[guests.length - 1].keyId + 1,
            keyFirstName: firstName,
            keyLastName: lastName,
          };
          const newGuestList = [...guests];
          newGuestList.push(newGuest);
          setGuests(newGuestList);
        }}
      >
        {' '}
        Add Guest
      </button> */}
      <h1>Guest List</h1>
      <div>
        {guests.map((guest) => {
          return (
            <div key={`guest-${guest.id}`}>
              <h2>
                {guest.firstName} {guest.lastName}
              </h2>
              <div>Guests ID: {guest.id}</div>
              <div>
                <label>
                  Attending: {guest.attending}
                  <input
                    type="checkbox"
                    checked={isAttending}
                    onChange={(event) =>
                      setIsAttending(event.currentTarget.checked)
                    }
                  />
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
