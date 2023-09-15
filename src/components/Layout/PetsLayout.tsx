import PetsList from "../../pages/Pets/PetsList"


const data = [
    {
        avatar: 'https://images.unsplash.com/photo-1593642532450-2c5a5e7b8c5e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=200',
        name: 'John Doe',
        job: 'manager',
        email: 'john-doe@gmail',
        phone: '+1 (323) 555-55-55',
    },
    {
        avatar: 'https://images.unsplash.com/photo-1593642532450-2c5a5e7b8c5e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=200',
        name: 'John Doe',
        job: 'manager',
        email: 'john-doe@gmail',
        phone: '+1 (323) 555-55-55',
    },
    {
        avatar: 'https://images.unsplash.com/photo-1593642532450-2c5a5e7b8c5e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=200',
        name: 'John Doe',
        job: 'manager',
        email: 'john-doe@gmail',
        phone: '+1 (323) 555-55-55',
    },
]

const PetsLayout = () => {
    return (
        <>
            <PetsList data={data}/>
        </>
    )
}

// pass data to PetsList

export default PetsLayout