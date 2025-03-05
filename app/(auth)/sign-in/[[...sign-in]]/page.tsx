import { SignIn } from "@clerk/nextjs";
const SingnInPage=()=>{
    return(
        <main className="auth-page">
            <SignIn/>
        </main>
    )
}
export default SingnInPage