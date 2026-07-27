$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- native form submission handled by formsubmit.co in HTML -->

});


if (document.querySelector('.typing-text')) {
    var typed = new Typed(".typing-text", {
        strings: ["Data Analysis", "Artificial Intelligence", "Data Science", "Machine Learning", "Deep Learning", "Neural Networks", "AI Development", "Blockchain Technology", "3D Animation", "VFX"],
        loop: true,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 500,
    });
}
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response;
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("achievements.json");
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    if (!skillsContainer) return;
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showAchievements(achievements) {
    let achievementsContainer = document.querySelector("#achievements .box-container");
    if (!achievementsContainer) return;

    let isMainPage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/" || window.location.pathname.endsWith("/");
    
    // Sort so certificates appear first, then badges
    let sortedAchievements = achievements.sort((a, b) => {
        let typeA = a.type || 'certificate';
        let typeB = b.type || 'certificate';
        if (typeA === typeB) return 0;
        return typeA === 'certificate' ? -1 : 1;
    });

    let displayAchievements = isMainPage ? sortedAchievements.slice(0, 3) : sortedAchievements;

    let achievementHTML = "";
    displayAchievements.forEach(ach => {
        let achType = ach.type || "certificate";
        let descHtml = ach.desc ? `<p>${ach.desc}</p>` : '';

        if (achType === "badge") {
            achievementHTML += `
            <div class="box badge-card tilt ${achType}">
              <div class="badge-inner">
                <div class="badge-front">
                  <img draggable="false" src="${ach.image}" alt="badge" onerror="this.onerror=null; this.src='./assets/images/certificate-placeholder.svg';" />
                </div>
                <div class="badge-back">
                  <h3>${ach.name}</h3>
                  ${descHtml}
                  <div class="btns">
                    <a href="${ach.link}" class="btn" target="_blank"><i class="fas fa-external-link-alt"></i> Verify</a>
                  </div>
                </div>
              </div>
            </div>`;
        } else {
            achievementHTML += `
            <div class="box tilt ${achType}">
              <img draggable="false" src="${ach.image}" alt="achievement" onerror="this.onerror=null; this.src='./assets/images/certificate-placeholder.svg';" />
              <div class="content">
                <div class="tag">
                <h3>${ach.name}</h3>
                </div>
                <div class="desc">
                  ${descHtml}
                  <div class="btns">
                    <a href="${ach.link}" class="btn" target="_blank"><i class="fas fa-external-link-alt"></i> Verify</a>
                  </div>
                </div>
              </div>
            </div>`;
        }
    });
    achievementsContainer.innerHTML = achievementHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    // Simple flexbox-friendly filter
    if (document.querySelector('.work .button-group')) {
        let filterButtons = document.querySelectorAll('.work .button-group .btn');
        let boxes = achievementsContainer.querySelectorAll('.box');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(b => b.classList.remove('is-checked'));
                btn.classList.add('is-checked');

                let filterValue = btn.getAttribute('data-filter');

                // Filter boxes
                boxes.forEach(box => {
                    if (filterValue === '*' || box.classList.contains(filterValue.replace('.', ''))) {
                        box.style.display = 'block';
                        // Override ScrollReveal hidden state
                        box.style.visibility = 'visible';
                        box.style.opacity = '1';
                        box.style.transform = 'none';
                    } else {
                        box.style.display = 'none';
                    }
                });
            });
        });
    }

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1200,
        reset: true, // Re-enable for desktop
        viewFactor: 0.1, // Trigger earlier
        mobile: false, // Disable entirely on mobile to fix scrolling bugs
        easing: 'cubic-bezier(0.5, 0, 0, 1)'
    });

    /* SCROLL ACHIEVEMENTS */
    srtop.reveal('.work .box', { origin: 'bottom' });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("achievements").then(data => {
    showAchievements(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}



/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1200,
    reset: true,
    mobile: false,
    easing: 'cubic-bezier(0.5, 0, 0, 1)'
});

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { origin: 'bottom' });
srtop.reveal('.about .content .tag', { origin: 'bottom' });
srtop.reveal('.about .content p', { origin: 'bottom' });
srtop.reveal('.about .content .box-container', { origin: 'bottom' });
srtop.reveal('.about .content .resumebtn', { origin: 'bottom' });
srtop.reveal('.about .image', { origin: 'left' });

/* SCROLL SKILLS */
srtop.reveal('.skills .container', { origin: 'bottom' });
srtop.reveal('.skills .container .bar', { origin: 'bottom' });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { origin: 'bottom' });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { origin: 'bottom' });

/* SCROLL EXPERIENCE */


/* SCROLL CONTACT */
srtop.reveal('.contact .container', { origin: 'bottom' });
srtop.reveal('.contact .container .form-group', { origin: 'bottom' });