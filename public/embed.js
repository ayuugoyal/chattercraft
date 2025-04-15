(() => {
  // Only create the widget if we're in the top-level window (not in an iframe)
  if (window.self === window.top) {
    // Create widget elements
    function createChatWidget() {
      // Add CSS animations to the document
      const styleSheet = document.createElement("style");
      styleSheet.textContent = `
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
          50% { transform: scale(1.05); box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15); }
          100% { transform: scale(1); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(10px) scale(0.98); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `;
      document.head.appendChild(styleSheet);

      // Create button
      const button = document.createElement("button");
      button.id = "chattercraft-widget-button";
      button.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
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
        z-index: 9090;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        animation: pulse 2s infinite ease-in-out;
      `;

      // Create loading spinner
      const spinner = document.createElement("div");
      spinner.style.cssText = `
        width: 24px;
        height: 24px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s infinite linear;
        position: absolute;
        display: none;
      `;
      button.appendChild(spinner);

      // Create iframe container
      const container = document.createElement("div");
      container.id = "chattercraft-widget-container";
      container.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 380px;
        height: 600px;
        max-height: 70vh;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        display: none;
        opacity: 0;
        transform: translateY(10px) scale(0.98);
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      `;

      // Get the script tag to extract the slug
      const scriptTag =
        document.currentScript || document.querySelector("script[data-slug]");
      const slug = scriptTag.getAttribute("data-slug");

      if (!slug) {
        console.error(
          "ChatterCraft: Missing data-slug attribute on script tag"
        );
        return;
      }

      // Create iframe
      const iframe = document.createElement("iframe");

      // Create loading overlay for iframe
      const loadingOverlay = document.createElement("div");
      loadingOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #f8f9fa;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        transition: opacity 0.5s ease;
      `;

      const loadingSpinner = document.createElement("div");
      loadingSpinner.style.cssText = `
        width: 40px;
        height: 40px;
        border: 4px solid rgba(0, 112, 243, 0.2);
        border-radius: 50%;
        border-top-color: #0070f3;
        animation: spin 1s infinite linear;
      `;

      loadingOverlay.appendChild(loadingSpinner);
      container.appendChild(loadingOverlay);

      // Determine the base URL
      const scriptSrc = scriptTag.src;
      const baseUrl = scriptSrc.substring(0, scriptSrc.lastIndexOf("/"));

      iframe.src = `${baseUrl}/chat/${slug}`;
      iframe.style.cssText = `
        width: 100%;
        height: 100%;
        border: none;
        opacity: 0;
        transition: opacity 0.5s ease;
      `;

      // Hide loading overlay when iframe is loaded
      iframe.onload = () => {
        iframe.style.opacity = "1";
        setTimeout(() => {
          loadingOverlay.style.opacity = "0";
          setTimeout(() => {
            loadingOverlay.style.display = "none";
          }, 500);
        }, 300);
      };

      container.appendChild(iframe);
      document.body.appendChild(button);
      document.body.appendChild(container);

      // Button hover effects
      button.addEventListener("mouseenter", () => {
        button.style.animation = "none";
        button.style.transform = "scale(1.1)";
        button.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.15)";
      });

      button.addEventListener("mouseleave", () => {
        button.style.transform = "scale(1)";
        button.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
        // Restart the pulse animation after a short delay
        setTimeout(() => {
          button.style.animation = "pulse 2s infinite ease-in-out";
        }, 300);
      });

      // Toggle chat widget with animations
      let isOpen = false;
      button.addEventListener("click", () => {
        if (!isOpen) {
          // Show loading spinner in button
          button.querySelector("svg").style.display = "none";
          spinner.style.display = "block";

          // Open chat container with animation
          container.style.display = "block";
          setTimeout(() => {
            container.style.opacity = "1";
            container.style.transform = "translateY(0) scale(1)";

            // Hide spinner and show icon after animation completes
            setTimeout(() => {
              spinner.style.display = "none";
              button.querySelector("svg").style.display = "block";

              // Change button appearance when open
              button.style.backgroundColor = "#f44336";
              button.style.transform = "rotate(45deg)";
              button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              `;
            }, 300);
          }, 50);
        } else {
          // Close animation
          container.style.opacity = "0";
          container.style.transform = "translateY(10px) scale(0.98)";

          // Change button back to original state with animation
          button.style.backgroundColor = "#0070f3";
          button.style.transform = "rotate(0deg)";
          button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          `;

          setTimeout(() => {
            container.style.display = "none";

            // Restart the pulse animation
            setTimeout(() => {
              button.style.animation = "pulse 2s infinite ease-in-out";
            }, 300);
          }, 300);
        }

        isOpen = !isOpen;
      });

      // Add close button to container with animation
      const closeButton = document.createElement("button");
      closeButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
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
        transition: all 0.2s ease;
        opacity: 0.7;
      `;

      closeButton.addEventListener("mouseenter", () => {
        closeButton.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
        closeButton.style.opacity = "1";
        closeButton.style.transform = "scale(1.1)";
      });

      closeButton.addEventListener("mouseleave", () => {
        closeButton.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        closeButton.style.opacity = "0.7";
        closeButton.style.transform = "scale(1)";
      });

      closeButton.addEventListener("click", (e) => {
        e.stopPropagation();

        // Add closing animation
        container.style.animation = "fadeOut 0.3s forwards";

        // Reset button state
        button.style.backgroundColor = "#0070f3";
        button.style.transform = "rotate(0deg)";
        button.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        `;

        setTimeout(() => {
          container.style.display = "none";
          container.style.animation = "";
          isOpen = false;

          // Restart the pulse animation
          setTimeout(() => {
            button.style.animation = "pulse 2s infinite ease-in-out";
          }, 300);
        }, 300);
      });

      container.appendChild(closeButton);

      // Handle messages from iframe
      window.addEventListener("message", (event) => {
        // Check if the message is from our iframe
        if (event.data && event.data.type === "chattercraft-widget") {
          // Handle different message types
          switch (event.data.action) {
            case "close":
              // Trigger close animation
              closeButton.click();
              break;
            case "bounce":
              // Add a bounce animation to the button
              button.style.animation = "bounce 0.5s ease";
              setTimeout(() => {
                button.style.animation = "pulse 2s infinite ease-in-out";
              }, 500);
              break;
            // Add more actions as needed
          }
        }
      });
    }

    // Initialize widget when DOM is loaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", createChatWidget);
    } else {
      createChatWidget();
    }
  }
})();
