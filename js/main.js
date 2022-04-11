const run = () => {

    const no = document.querySelector("#no");

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    no.addEventListener("click", (e) => {
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const positionHeightButton = getRandomArbitrary(0, windowHeight - e.target.offsetHeight);
        const positionWidthButton = getRandomArbitrary(0, (windowWidth - e.target.offsetWidth));
        console.log(e.target);
        e.target.style.top = positionHeightButton;
        e.target.style.left = positionWidthButton;
        e.target.setAttribute("style", `top: ${positionHeightButton}px; left: ${positionWidthButton}px; right: unset`);
        console.dir(e.target);

    });

    const yes = document.querySelector("#yes");



    yes.addEventListener("click", (e) => {
        e.preventDefault();
        const resultLocal = JSON.parse(localStorage.getItem("COUNT"));
        fetch(`https://6253a94ec534af46cb994431.mockapi.io/count/${resultLocal.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "count": resultLocal.count,
                "countYes": resultLocal.countYes + 1,

            })
        }).then((res) => {
            return res.json();
        }).then((result) => {
            localStorage.setItem("COUNT", JSON.stringify(result));
            if (!window.location.pathname.includes("hoi-an")) {

                const tagA = document.createElement("a");
                tagA.href = "./view/hoi-an.html";
                tagA.click();
            } else {
                document.querySelector("#mess-content").classList.add("open");
            }
        });


    });
};
if (!localStorage.getItem("COUNT")) {
    fetch("https://6253a94ec534af46cb994431.mockapi.io/count")
        .then((res) => res.json())
        .then(result => {

            if (result.length === 0) {

                fetch(`https://6253a94ec534af46cb994431.mockapi.io/count`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "count": 1,
                        "countYes": 0,

                    })
                }).then((res) => {
                    return res.json();
                }).then((result) => {
                    localStorage.setItem("COUNT", JSON.stringify(result));
                    run();
                });
            } else {
                document.body.innerHTML = "";
            }
        });
} else {
    const resultLocal = JSON.parse(localStorage.getItem("COUNT"));

    fetch(`https://6253a94ec534af46cb994431.mockapi.io/count/${resultLocal.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "count": resultLocal.count + 1,
            "countYes": resultLocal.countYes,

        })
    }).then((res) => {
        return res.json();
    }).then((result) => {
        localStorage.setItem("COUNT", JSON.stringify(result));
        run();

    });
}