// Function to handle visibility change
function handleVisibilityChange() {
    if (document.hidden) {
        console.log("The user is not viewing the page.");
    } else {
        console.log("The user is viewing the page.");
    }
}

// Listen for visibility changes
document.addEventListener('visibilitychange', handleVisibilityChange);
