import { useEffect, useState } from 'react';

const baseUrl = 'http://localhost:4000';

export default function App() {
  const [guestList, setGuestList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAttending, setIsAttending] = useState(false);

  // Show whole guest list with GET method
  useEffect(() => {
    async function showGuestList() {
      const response = await fetch(`${baseUrl}/guests`);
      const data = await response.json();
      setGuestList(data);
    }
    showGuestList().catch((error) => console.log(error));
  }, []);

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
    const createdGuest = await response.json();
    const newGuestList = [...guestList];
    newGuestList.push(createdGuest);
    setGuestList(newGuestList);
    // Remove value from input fields
    setFirstName('');
    setLastName('');
  }

  // Delete guest from the list by DELETE method
  async function deleteGuestFromList(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    const currentGuestList = [...guestList];
    //  Filter guests by ID
    const newGuestList = currentGuestList.filter(
      (guest) => guest.id !== deletedGuest.id,
    );
    setGuestList(newGuestList);
    deleteGuestFromList().catch((error) => console.log(error));
  }

  return (
    <div data-test-id="guest">
      <form onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="FirstName">First name</label>
        <input
          id="FirstName"
          value={firstName}
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
        <label htmlFor="LastName">Last name</label>
        <input
          id="LastName"
          value={lastName}
          onChange={(event) => setLastName(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              addGuestToList();
            }
          }}
        />

        <button
          onClick={(event) => {
            addGuestToList();
          }}
        >
          Add Guest
        </button>
        <h1>Guest List</h1>
        <div>
          {guestList.map((guest) => {
            return (
              <div key={`guest-${guest.id}`}>
                <h4>
                  {guest.firstName} {guest.lastName}
                </h4>
                <div>Guest ID: {guest.id}</div>
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
                <button
                  onClick={(event) => {
                    deleteGuestFromList(guest.id);
                    console.log(guest.id);
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
}
