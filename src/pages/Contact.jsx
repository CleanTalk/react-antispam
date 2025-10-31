import ContactForm from '../components/ContactForm.jsx'

export default function Contact() {
  // If you have a backend endpoint, set it here (or pass undefined to simulate)
  const endpoint = undefined // e.g. 'https://your.api/contacts'

  return (
    <section>
      <h1>Contact</h1>
      <p>Have a question or want to work together? Send us a message.</p>
      <ContactForm onSubmitEndpoint={endpoint} />
    </section>
  )
}
