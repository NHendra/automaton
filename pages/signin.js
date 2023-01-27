import cx from 'classnames';
import styles from '../styles/Home.module.css'
import { signIn } from "next-auth/react";
import { useState } from 'react';

export default function Signin() {
    const [pass, setPass] = useState('');
    const handleLoginUser = async (e) => {    
        e.preventDefault();
        await signIn("credentials", {
            redirect: false,
            password: pass
        });
    }
    function setDataPass(val) {
        setPass(val.target.value);
    }

    return (
        <>
            <main className={cx(styles["form-signin"],"text-center")}>
                <form method="post" onSubmit={handleLoginUser}>
                    <input name="password" type="password" className="form-control placeholder-shown" id="floatingPassword" placeholder="Password" onChange={setDataPass} />
                </form>
            </main>
        </>
    )
}