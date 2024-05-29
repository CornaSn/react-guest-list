import './App.css';
import { useEffect, useState } from 'react';
import styles from './App.module.scss';

const baseUrl = 'http://localhost:4000';

export default function App() {
  const [guestList, setGuestList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Show whole guest list with GET method
  useEffect(() => {
    async function showGuestList() {
      const response = await fetch(`${baseUrl}/guests`);
      const data = await response.json();
      setGuestList(data);
      setIsLoading(false);
    }
    showGuestList().catch((error) => console.log(error));
  }, []);

  // Add new guest to list with POST method
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
    if (id.length > 0) {
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
      // deleteGuestFromList().catch((error) => console.log(error));
    }
  }

  // Update attending status of guest by PUT method
  async function updateGuestFromList(id, attending) {
    let oppositeOfAttending;
    if (attending === true) {
      oppositeOfAttending = false;
    } else {
      oppositeOfAttending = true;
    }
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: oppositeOfAttending }),
    });
    const updatedGuest = await response.json();

    // Create a new guest list with the updated guest
    const newGuestList = guestList.map((guest) =>
      guest.id === id ? { ...guest, attending: oppositeOfAttending } : guest,
    );
    setGuestList(newGuestList);
  }

  if (isLoading) {
    return <h1> Loading...</h1>;
  }
  return (
    <div className={styles.inputContainer}>
      <h1>Guest List</h1>
      <form onSubmit={(event) => event.preventDefault()}>
        <div className={styles.guestInput}>
          <label htmlFor="First name">First name</label>
          <input
            className={styles.inputField}
            id="First name"
            value={firstName}
            placeholder="Enter your first name here..."
            onChange={(event) => setFirstName(event.currentTarget.value)}
          />
          <label htmlFor="Last name">Last name</label>
          <input
            className={styles.inputField}
            id="Last name"
            value={lastName}
            placeholder="Enter your last name here..."
            onChange={(event) => setLastName(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                addGuestToList().catch((error) => console.log(error));
              }
            }}
          />
          <button
            className={styles.buttonAdd}
            onClick={() => {
              addGuestToList().catch((error) => console.log(error));
            }}
          >
            Add Guest
          </button>
        </div>

        <div>
          {guestList.map((guest) => {
            return (
              <div
                className={styles.guestList}
                key={`guest-${guest.id}`}
                data-test-id="guest"
              >
                <div>
                  <input
                    aria-label={`${guest.firstName} ${guest.lastName} attending status`}
                    type="checkbox"
                    checked={guest.attending}
                    onChange={() => {
                      updateGuestFromList(guest.id, guest.attending).catch(
                        (error) => console.log(error),
                      );
                      // console.log(guest.id);
                      // console.log(guest.attending);
                    }}
                  />
                  <span>{guest.attending ? 'attending' : 'not attending'}</span>
                </div>
                <h2>
                  {guest.firstName} {guest.lastName}
                </h2>
                <div>Guest ID: {guest.id}</div>
                <button
                  className={styles.buttonRemove}
                  aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
                  onClick={() => {
                    deleteGuestFromList(guest.id).catch((error) =>
                      console.log(error),
                    );
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
