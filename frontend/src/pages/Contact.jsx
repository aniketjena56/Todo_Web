import React from 'react'

const Contact = () => {

    const email="jenanik2@gmail.com"
    const message="hey u can ask here what u want"
    const submit = ()=>{

// This is a built-in browser command. It redirects the user to a new link
        window.location.href=`mailto:${email} ? subject=&body=${encodeURIComponent(message)}`

// mailto: is a special kind of link that opens the email app instead of a website.

// ${email} means you're putting your email into that link.

// So if email = 'yourmail@example.com',
// this becomes: mailto:yourmail@example.com




// ? starts the query (extra info to send)

// subject= is where you'd add a subject for the email. It's empty here (but you can fill it!)

// &body= is where you put your message





// encodeURIComponent(message)
// Because:

// Emails don’t like spaces or special characters.

// This converts your message into a format that works in URLs.

// For example: "Hey there!" becomes "Hey%20there%21"

    }
    

  return (
    <>
  <h1 className='text-center text-4xl p-8'> Contact Me </h1>
    <div className='bg-gray-400 min-h-screen flex justify-around items-center'> 

      <button className='bg-red-500 p-8 rounded-2xl text-2xl' onClick={submit}>Click here</button>

      <h1 className='text-center text-4xl p-8'>OR</h1>

    <div className='bg-white text-center m-4 rounded-lg shadow-md w-64 h-64 flex flex-col justify-center  '>

    <p><strong>Name </strong>: Aniket Jena</p>
    <p><strong>Email</strong>: jenanik2@gmail.com</p>
    </div>
    </div>
    </>
  )
}

export default Contact






