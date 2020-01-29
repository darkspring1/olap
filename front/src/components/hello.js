const Hello = ({ person, incCounter }) => (
    <>
        <div>Hello {person.name}</div>
        <button onClick={() => incCounter(person.name)}>Push</button>
    </>
    )

    export default Hello