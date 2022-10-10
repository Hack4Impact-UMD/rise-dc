import {useState} from 'react'
import {getAuth} from 'firebase/auth'
const DummyLanding = () => {

    const [role, setRole] = useState<String | null>(null);
    const auth = getAuth()
    const user = auth.currentUser
    if (user) {
        user.getIdTokenResult()
        .then((idTokenResult) => {
            if (!!idTokenResult.claims.admin) {
                setRole("Admin")
            } else {
                setRole("User")
            }
        })
        .catch((error: any) => {
            console.log(error);
        })
    }

    return (
            <div>
                {role}
            </div>
    )
}

export default DummyLanding;