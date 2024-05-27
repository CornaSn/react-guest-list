import { useEffect, useState } from 'react';

const baseUrl = 'http://localhost:4000';

export default function App() {
  const [guestList, setGuestList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAttending, setIsAttending] = useState(false);

  // Add new guest to List with POST method
  async function addGuestToList() {
    // Variable for the POST request
    const newGuestInfo = {
      firstName: firstName,
      lastName: lastName,
      attending: false,
    };
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGuestInfo),
    });
    const data = await response.json();
    console.log(data);
    addGuestToList().catch((error) => console.log(error));
  }

  // Show whole guest list with GET method
  useEffect(() => {
    async function showGuestList() {
      const response = await fetch(`${baseUrl}/guests`);
      const data = await response.json();
      setGuestList(data);
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
          // onKeyDown={(event) => {
          //   const newGuest = {
          //     firstName: firstName,
          //     lastName: lastName,
          //   };
          //   if (event.key === 'Enter') {
          //     addGuestToList();
          //   }
          // }}
        />
        <label htmlFor="LastName">Last name</label>

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
          {guestList.map((guest) => {
            return (
              <div key={`guest-${guest.id}`}>
                <h4>
                  {guest.firstName} {guest.lastName}
                </h4>
                <div>Guests ID: {guest.id}</div>
                <div>
                  <aria-label>
                    {isAttending ? 'attending' : 'not attending'}
                    <input
                      type="checkbox"
                      defaultChecked={isAttending}
                      checked={isAttending}
                      onChange={(event) =>
                        setIsAttending(event.currentTarget.checked)
                      }
                    />
                  </aria-label>
                </div>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
}
