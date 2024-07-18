
//This is the drop down list for poems in home page
function navigateToPage() {
    var dropdown = document.getElementById("dropdown");
    var selectedPage = dropdown.value;
    if (selectedPage) {
        window.location.href = selectedPage;
    }
}


