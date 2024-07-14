function navigateToPage() {
    var dropdown = document.getElementById("dropdown");
    var selectedPage = dropdown.value;
    if (selectedPage) {
        window.location.href = selectedPage;
    }
}