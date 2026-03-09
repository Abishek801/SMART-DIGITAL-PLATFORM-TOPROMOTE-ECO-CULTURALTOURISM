export const metadata = {
  title: "Contact | EcoCulture",
  description:
    "Get in touch with the EcoCulture team for your sustainable travel needs.",
};

export default function ContactPage() {
  return (
    <main className="container animate-fade-in">
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "4rem 0" }}>
        <h1
          style={{
            fontSize: "3rem",
            color: "var(--primary)",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Get in Touch
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "var(--text-muted)",
            marginBottom: "3rem",
          }}
        >
          Have a question about your sustainable journey? We're here to help!
        </p>

        <form
          className="glass-panel delay-1"
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 500,
              }}
            >
              Name
            </label>
            <input
              type="text"
              className="input-glass"
              placeholder="Your full name"
              required
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 500,
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              className="input-glass"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 500,
              }}
            >
              Message
            </label>
            <textarea
              className="input-glass"
              rows={5}
              placeholder="How can we help you?"
              required
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: "1rem" }}
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
