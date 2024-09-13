// Function to copy Plus Code to clipboard
function copyCode() {
    var copyText = document.getElementById("codeToCopy");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    document.execCommand("copy");

    // Show the message
    var message = document.getElementById("copyMessage");
    message.classList.remove("hidden");

    // Hide the message after 2 seconds
    setTimeout(function() {
        message.classList.add("hidden");
    }, 2000);
}

// Function to generate Google Maps link
function generateLink() {
    var plusCode = document.getElementById("codeToOpen").value.trim();
    var linkElement = document.getElementById("link");
    var mapsLink = document.getElementById("mapsLink");

    if (plusCode) {
        // Generate the Google Maps link using Plus Code
        var mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(plusCode);

        // Set the href attribute of the anchor element to the generated URL
        mapsLink.href = mapsUrl;

        // Show the link div
        linkElement.classList.remove("hidden");
    } else {
        // Hide the link if no Plus Code is provided
        linkElement.classList.add("hidden");
    }
}