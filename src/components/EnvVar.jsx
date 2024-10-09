/**Reading env var */

export function EnvVar(){

  return(
    <>
    <h1>Env variables</h1>
    <h2>Key 1: {import.meta.env.VITE_KEY_1}</h2>
    <h2>Secret 1: {import.meta.env.VITE_SECRET_1}</h2>
    </>
  )
}