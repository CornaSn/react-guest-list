import { useEffect, useState } from 'react';

const baseUrl = 'http://localhost:4000';

export default function App() {
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    async function addMyselfAsGuest() {
      const response = await fetch(`${baseUrl}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: 'Cornelia',
          lastName: 'Schenk',
        }),
      });
      const data = await response.json();
      console.log('data', data);
    }
    addMyselfAsGuest().catch((error) => console.log(error));
  }, []);

  async function showGuestList() {
    const response = await fetch(`${baseUrl}/guests`);
    const data = await response.json();
    setGuests(data);
  }
  showGuestList().catch((error) => console.log(error));

  return (
    <div data-test-id="guest">
      {/* <form onSubmit={(event) => event.preventDefault()}>
        <input
          value={firstName}
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
        <label htmlFor="FirstName:">First name</label>
        <input
          value={lastName}
          onChange={(event) => setLastName(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              const newGuest = {
                keyId: guests[guests.length - 1].keyId + 1,
                keyFirstName: firstName,
                keyLastName: lastName,
              };
              const newGuestList = [...guests];
              newGuestList.push(newGuest);
              setGuests(newGuestList);
              setFirstName('');
              setLastName('');
              console.log(guests);
            }
          }}
        />
        <label htmlFor="LastName:">Last name</label>
      </form>
      <button */}
      {/* onClick=
      {(event) => {
        const newGuest = {
          keyId: guests[guests.length - 1].keyId + 1,
          keyFirstName: firstName,
          keyLastName: lastName,
        };
        const newGuestList = [...guests];
        newGuestList.push(newGuest);
        setGuests(newGuestList);
        console.log(guests);
      }}
      > Add Guest
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
              <div>Attending: {guest.attending}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
