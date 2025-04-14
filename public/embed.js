;(() => {
  // Create widget elements
  function createChatWidget() {
    // Create button
    const button = document.createElement("button")
    button.id = "chattercraft-widget-button"
    button.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'
    button.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #0070f3;
      color: white;
      border: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      transition: all 0.2s ease;
    `

    // Create iframe container
    const container = document.createElement("div")
    container.id = "chattercraft-widget-container"
    container.style.cssText = `
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 380px;
      height: 600px;
      max-height: 70vh;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
      z-index: 9999;
      display: none;
      opacity: 0;
      transition: all 0.3s ease;
    `

    // Get the script tag to extract the slug
    const scriptTag = document.currentScript || document.querySelector("script[data-slug]")
    const slug = scriptTag.getAttribute("data-slug")

    if (!slug) {
      console.error("ChatterCraft: Missing data-slug attribute on script tag")
      return
    }

    // Generate a session ID or use existing one
    let sessionId = localStorage.getItem(`chattercraft-session-${slug}`)
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 12)
      localStorage.setItem(`chattercraft-session-${slug}`, sessionId)
    }

    // Create iframe
    const iframe = document.createElement("iframe")

    // Determine the base URL
    const scriptSrc = scriptTag.src
    const baseUrl = scriptSrc.substring(0, scriptSrc.lastIndexOf("/"))

    iframe.src = `${baseUrl}/chat/${slug}?session=${sessionId}`
    iframe.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
    `

    container.appendChild(iframe)
    document.body.appendChild(button)
    document.body.appendChild(container)

    // Toggle chat widget
    button.addEventListener("click", () => {
      if (container.style.display === "none") {
        container.style.display = "block"
        setTimeout(() => {
          container.style.opacity = "1"
        }, 50)
      } else {
        container.style.opacity = "0"
        setTimeout(() => {
          container.style.display = "none"
        }, 300)
      }
    })

    // Add close button to container
    const closeButton = document.createElement("button")
    closeButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `
    closeButton.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.1);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      transition: background-color 0.2s ease;
    `
    closeButton.addEventListener("click", (e) => {
      e.stopPropagation()
      container.style.opacity = "0"
      setTimeout(() => {
        container.style.display = "none"
      }, 300)
    })

    container.appendChild(closeButton)

    // Handle messages from iframe
    window.addEventListener("message", (event) => {
      // Check if the message is from our iframe
      if (event.data && event.data.type === "chattercraft-widget") {
        // Handle different message types
        switch (event.data.action) {
          case "close":
            container.style.opacity = "0"
            setTimeout(() => {
              container.style.display = "none"
            }, 300)
            break
          // Add more actions as needed
        }
      }
    })
  }

  // Initialize widget when DOM is loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createChatWidget)
  } else {
    createChatWidget()
  }
})()
