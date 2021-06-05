// know the currennt rout of the user
const rout = window.location.origin;
const form = document.getElementById("feedbackForm");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const feedback = form['feedback'].value;
    const token = localStorage.getItem('token');
    const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            feedback
        })
    }).then(res => res.json());
    if(res.msg == "expired"){
        localStorage.setItem("last-route",window.location.href)
        window.location.href = "/auth/signin"
    }
})