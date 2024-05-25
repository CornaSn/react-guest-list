import { useState } from 'react';

// Example Guest List
const guestList = [
  {
    keyId: 1,
    keyFirstName: 'Cornelia',
    keyLastName: 'Schenk',
    keyAttending: 'true',
  },
  {
    keyId: 2,
    keyFirstName: 'Alex',
    keyLastName: 'Papst',
    keyAttending: 'true',
  },
];

export default function App() {
  const [guests, setGuests] = useState(guestList);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        <input
          value={firstName}
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
        <label htmlFor="FirstName:">First name</label>
        <input
          value={lastName}
          onChange={(event) => setLastName(event.currentTarget.value)}
        />
        <label htmlFor="LastName:">Last name</label>
      </form>
      <button
        onClick={(event) => {
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
      >
        Add Guest
      </button>

      {/* Only for showing Purpose */}
      <div>
        {guests.map((guest) => {
          return (
            <div key={`guest-${guest.keyId}`}>
              <h2>
                First name: {guest.keyFirstName}
                <br />
                Last name: {guest.keyLastName}
              </h2>
              <div>Guests ID: {guest.keyId}</div>
              <div>Attending: {guest.keyAttending}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
