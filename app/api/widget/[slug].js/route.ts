import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { agents, uiConfigs } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function GET(req: NextRequest, { params }: { params: { "slug.js": string } }) {
  try {
    // Extract slug from the parameter (removing .js extension)
    const slug = params["slug.js"].replace(".js", "")

    // Get agent by slug
    const agent = await db.query.agents.findFirst({
      where: eq(agents.slug, slug),
    })

    if (!agent) {
      return new NextResponse("Agent not found", { status: 404 })
    }

    // Get UI config if it exists
    const uiConfig = await db.query.uiConfigs.findFirst({
      where: eq(uiConfigs.agentId, agent.id),
    })

    // Generate the widget script with embedded configuration
    const script = generateWidgetScript(agent, uiConfig)

    // Return the script with proper content type
    return new NextResponse(script, {
      headers: {
        "Content-Type": "application/javascript",
      },
    })
  } catch (error) {
    console.error("Error generating widget script:", error)
    return new NextResponse("Error generating widget script", { status: 500 })
  }
}

function generateWidgetScript(agent: any, uiConfig: any) {
  return `
;(() => {
  // Create widget elements
  function createChatWidget() {
    // Get configuration from window object or use defaults
    const config = window.ChatterCraftConfig || {};
    
    // Default configuration
    const defaultConfig = {
      primaryColor: "${uiConfig?.primaryColor || "#0070f3"}",
      secondaryColor: "${uiConfig?.secondaryColor || "#f5f5f5"}",
      backgroundColor: "${uiConfig?.backgroundColor || "#ffffff"}",
      textColor: "${uiConfig?.textColor || "#333333"}",
      buttonPosition: "${uiConfig?.buttonPosition || "bottom-right"}",
      buttonSize: ${uiConfig?.buttonSize || 60},
      widgetWidth: ${uiConfig?.widgetWidth || 380},
      widgetHeight: ${uiConfig?.widgetHeight || 600},
      borderRadius: ${uiConfig?.borderRadius || 8},
      welcomeMessage: "${uiConfig?.welcomeMessage || "Hello! How can I help you today?"}",
      buttonIcon: "${uiConfig?.buttonIcon || "message"}",
      headerTitle: "${uiConfig?.headerTitle || agent.name || "Chat Support"}",
      showAgentAvatar: ${uiConfig?.showAgentAvatar !== undefined ? uiConfig.showAgentAvatar : true},
      showTimestamp: ${uiConfig?.showTimestamp !== undefined ? uiConfig.showTimestamp : true},
      showTypingIndicator: ${uiConfig?.showTypingIndicator !== undefined ? uiConfig.showTypingIndicator : true},
      enableDarkMode: ${uiConfig?.enableDarkMode !== undefined ? uiConfig.enableDarkMode : false},
      allowAttachments: ${uiConfig?.allowAttachments !== undefined ? uiConfig.allowAttachments : false}
    };
    
    // Merge default config with user config
    const mergedConfig = { ...defaultConfig, ...config };
    
    // Create button
    const button = document.createElement("button");
    button.id = "chattercraft-widget-button";
    
    // Set button icon based on configuration
    let buttonIconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
    
    button.innerHTML = buttonIconSvg;
    
    // Set button position and styles
    const buttonPositionStyles = getButtonPositionStyles(mergedConfig.buttonPosition);
    
    button.style.cssText = \`
      position: fixed;
      \${buttonPositionStyles}
      width: \${mergedConfig.buttonSize}px;
      height: \${mergedConfig.buttonSize}px;
      border-radius: 50%;
      background-color: \${mergedConfig.primaryColor};
      color: white;
      border: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      transition: all 0.2s ease;
    \`;

    // Create iframe container
    const container = document.createElement("div");
    container.id = "chattercraft-widget-container";
    
    // Set container position based on button position
    container.style.cssText = \`
      position: fixed;
      \${buttonPositionStyles}
      width: \${mergedConfig.widgetWidth}px;
      height: \${mergedConfig.widgetHeight}px;
      max-height: 70vh;
      border-radius: \${mergedConfig.borderRadius}px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
      z-index: 9999;
      display: none;
      opacity: 0;
      transition: all 0.3s ease;
    \`;

    // Get the script tag to extract the slug
    const scriptTag = document.currentScript || document.querySelector("script[data-slug]");
    const slug = scriptTag.getAttribute("data-slug");

    if (!slug) {
      console.error("ChatterCraft: Missing data-slug attribute on script tag");
      return;
    }

    // Generate a session ID or use existing one
    let sessionId = localStorage.getItem(\`chattercraft-session-\${slug}\`);
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 12);
      localStorage.setItem(\`chattercraft-session-\${slug}\`, sessionId);
    }

    // Create iframe
    const iframe = document.createElement("iframe");

    // Determine the base URL
    const scriptSrc = scriptTag.src;
    const baseUrl = scriptSrc.substring(0, scriptSrc.lastIndexOf("/"));
    const origin = new URL(baseUrl).origin;

    // Pass configuration to the iframe via URL parameters
    const configParams = new URLSearchParams({
      session: sessionId,
      primaryColor: mergedConfig.primaryColor,
      backgroundColor: mergedConfig.backgroundColor,
      textColor: mergedConfig.textColor,
      headerTitle: mergedConfig.headerTitle,
      showAgentAvatar: mergedConfig.showAgentAvatar.toString(),
      showTimestamp: mergedConfig.showTimestamp.toString(),
      showTypingIndicator: mergedConfig.showTypingIndicator.toString(),
      enableDarkMode: mergedConfig.enableDarkMode.toString(),
      allowAttachments: mergedConfig.allowAttachments.toString()
    }).toString();

    iframe.src = \`\${origin}/chat/\${slug}?\${configParams}\`;
    iframe.style.cssText = \`
      width: 100%;
      height: 100%;
      border: none;
    \`;

    container.appendChild(iframe);
    document.body.appendChild(button);
    document.body.appendChild(container);

    // Toggle chat widget
    button.addEventListener("click", () => {
      if (container.style.display === "none") {
        container.style.display = "block";
        setTimeout(() => {
          container.style.opacity = "1";
        }, 50);
      } else {
        container.style.opacity = "0";
        setTimeout(() => {
          container.style.display = "none";
        }, 300);
      }
    });

    // Add close button to container
    const closeButton = document.createElement("button");
    closeButton.innerHTML = \`
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    \`;
    closeButton.style.cssText = \`
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
    \`;
    closeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      container.style.opacity = "0";
      setTimeout(() => {
        container.style.display = "none";
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
            container.style.opacity = "0";
            setTimeout(() => {
              container.style.display = "none";
            }, 300);
            break;
          // Add more actions as needed
        }
      }
    });
  }

  // Helper function to get button position styles
  function getButtonPositionStyles(position) {
    switch (position) {
      case "bottom-right":
        return "bottom: 20px; right: 20px;";
      case "bottom-left":
        return "bottom: 20px; left: 20px;";
      case "top-right":
        return "top: 20px; right: 20px;";
      case "top-left":
        return "top: 20px; left: 20px;";
      default:
        return "bottom: 20px; right: 20px;";
    }
  }

  // Initialize widget when DOM is loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createChatWidget);
  } else {
    createChatWidget();
  }
})();
`
}
