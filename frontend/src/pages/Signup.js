import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
    const [email, setEmail] = useState('')
    const[password1, setPassword1] = useState('')
    const[password2, setPassword2] = useState('')
    const[noMatch, setNoMatch] = useState(null)
    const {signup, isLoading, error} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password1 !== password2) {
            setNoMatch(true)
            return
        }
        setNoMatch(null)
        await signup(email, password1)
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>
            <label>Email</label>
            <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input 
                type="password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
            />
            <label>Re-enter Password</label>
            <input 
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
            />
            <button disabled={isLoading}>Sign up</button>
            {noMatch && <div className="error">Passwords do not match!</div>}
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup