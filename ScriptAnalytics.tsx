import { useEffect } from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function AnalyticsAndTagManager({
    gtmID,
    gaID,
    backgroundColor,
}) {
    useEffect(() => {
        if (gtmID) {
            // Injetar código do Google Tag Manager no <head>
            const scriptTag = document.createElement("script")
            scriptTag.innerHTML = `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmID}');
            `
            document.head.appendChild(scriptTag)

            // Injetar código do Google Tag Manager no <body>
            const noScriptTag = document.createElement("noscript")
            noScriptTag.innerHTML = `
                <iframe src="https://www.googletagmanager.com/ns.html?id=${gtmID}"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `
            document.body.appendChild(noScriptTag)
        }

        if (gaID) {
            // Injetar código do Google Analytics no <head>
            const scriptGA = document.createElement("script")
            scriptGA.src = `https://www.googletagmanager.com/gtag/js?id=${gaID}`
            scriptGA.async = true
            document.head.appendChild(scriptGA)

            const scriptGAInline = document.createElement("script")
            scriptGAInline.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaID}');
            `
            document.head.appendChild(scriptGAInline)
        }
    }, [gtmID, gaID])

    return (
        <div
            style={{
                height: "0px",
                backgroundColor: backgroundColor || "transparent",
            }}
        ></div>
    )
}

AnalyticsAndTagManager.displayName = "Analytics & Tag Manager"

addPropertyControls(AnalyticsAndTagManager, {
    gtmID: {
        type: ControlType.String,
        title: "GTM ID",
        placeholder: "GTM-XXXXXXX",
    },
    gaID: {
        type: ControlType.String,
        title: "GA ID",
        placeholder: "UA-XXXXXXX-X",
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Background",
    },
})
