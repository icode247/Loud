
var openmodal = document.querySelectorAll('.modal-open')
for (var i = 0; i < openmodal.length; i++) {
    openmodal[i].addEventListener('click', function (event) {
        event.preventDefault()
        toggleModal()
    })
}

const overlay = document.querySelector('.modal-overlay')
overlay.addEventListener('click', toggleModal)

var closemodal = document.querySelectorAll('.modal-close')
for (var i = 0; i < closemodal.length; i++) {
    closemodal[i].addEventListener('click', toggleModal)
}

document.onkeydown = function (evt) {
    evt = evt || window.event
    var isEscape = false
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc")
    } else {
        isEscape = (evt.keyCode === 27)
    }
    if (isEscape && document.body.classList.contains('modal-active')) {
        toggleModal()
    }
};


function toggleModal() {
    const body = document.querySelector('body')
    const modal = document.querySelector('.modal')
    modal.classList.toggle('opacity-0')
    modal.classList.toggle('pointer-events-none')
    body.classList.toggle('modal-active')
}


function data() {

    return {

        isSideMenuOpen: false,
        toggleSideMenu() {
            this.isSideMenuOpen = !this.isSideMenuOpen
        },
        closeSideMenu() {
            this.isSideMenuOpen = false
        },
        isNotificationsMenuOpen: false,
        toggleNotificationsMenu() {
            this.isNotificationsMenuOpen = !this.isNotificationsMenuOpen
        },
        closeNotificationsMenu() {
            this.isNotificationsMenuOpen = false
        },
        isProfileMenuOpen: false,
        toggleProfileMenu() {
            this.isProfileMenuOpen = !this.isProfileMenuOpen
        },
        closeProfileMenu() {
            this.isProfileMenuOpen = false
        },
        isPagesMenuOpen: false,
        togglePagesMenu() {
            this.isPagesMenuOpen = !this.isPagesMenuOpen
        },

    }
}

var chart = document.querySelector('#chartline')
var options = {
    series: [{
        name: 'REPORTS',
        type: 'area',
        data: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33]
    }, {
        name: 'RECOMMEND',
        type: 'line',
        data: [55, 69, 45, 61, 43, 54, 100, 0, 120, 0, 100]
    }],
    chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: false
        }
    },
    stroke: {
        curve: 'smooth'
    },
    fill: {
        type: 'solid',
        opacity: [0.35, 1],
    },
    labels: ['Dec 01', 'Dec 02', 'Dec 03', 'Dec 04', 'Dec 05', 'Dec 06', 'Dec 07', 'Dec 08', 'Dec 09 ',
        'Dec 10', 'Dec 11'
    ],
    markers: {
        size: 0
    },
    yaxis: [{
        title: {
            text: 'Series A',
        },
    },
    {
        opposite: true,
        title: {
            text: 'Series B',
        },
    },
    ],
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: function (y) {
                if (typeof y !== "undefined") {
                    return y.toFixed(0) + " points";
                }
                return y;
            }
        }
    }
};
var chart = new ApexCharts(chart, options);
chart.render();
var chart = document.querySelector('#chartpie')
var options = {
    series: [44, 55, 67, 0],
    chart: {
        height: 350,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            dataLabels: {
                name: {
                    fontSize: '22px',
                },
                value: {
                    fontSize: '16px',
                },
                total: {
                    show: true,
                    label: 'Total',
                    formatter: function (w) {
                        // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                        return 249
                    }
                }
            }
        }
    },
    labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
};
var chart = new ApexCharts(chart, options);
chart.render();

const setup = () => {
    const getTheme = () => {
        if (window.localStorage.getItem('dark')) {
            return JSON.parse(window.localStorage.getItem('dark'))
        }

        return !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    const setTheme = (value) => {
        window.localStorage.setItem('dark', value)
    }

    const getColor = () => {
        if (window.localStorage.getItem('color')) {
            return window.localStorage.getItem('color')
        }
        return 'cyan'
    }

    const setColors = (color) => {
        const root = document.documentElement
        root.style.setProperty('--color-primary', `var(--color-${color})`)
        root.style.setProperty('--color-primary-50', `var(--color-${color}-50)`)
        root.style.setProperty('--color-primary-100', `var(--color-${color}-100)`)
        root.style.setProperty('--color-primary-light', `var(--color-${color}-light)`)
        root.style.setProperty('--color-primary-lighter', `var(--color-${color}-lighter)`)
        root.style.setProperty('--color-primary-dark', `var(--color-${color}-dark)`)
        root.style.setProperty('--color-primary-darker', `var(--color-${color}-darker)`)
        this.selectedColor = color
        window.localStorage.setItem('color', color)
        //
    }

    const updateBarChart = (on) => {
        const data = {
            data: randomData(),
            backgroundColor: 'rgb(207, 250, 254)',
        }
        if (on) {
            barChart.data.datasets.push(data)
            barChart.update()
        } else {
            barChart.data.datasets.splice(1)
            barChart.update()
        }
    }

    const updateDoughnutChart = (on) => {
        const data = random()
        const color = 'rgb(207, 250, 254)'
        if (on) {
            doughnutChart.data.labels.unshift('Seb')
            doughnutChart.data.datasets[0].data.unshift(data)
            doughnutChart.data.datasets[0].backgroundColor.unshift(color)
            doughnutChart.update()
        } else {
            doughnutChart.data.labels.splice(0, 1)
            doughnutChart.data.datasets[0].data.splice(0, 1)
            doughnutChart.data.datasets[0].backgroundColor.splice(0, 1)
            doughnutChart.update()
        }
    }

    const updateLineChart = () => {
        lineChart.data.datasets[0].data.reverse()
        lineChart.update()
    }

    return {
        loading: true,
        isDark: getTheme(),
        toggleTheme() {
            this.isDark = !this.isDark
            setTheme(this.isDark)
        },
        setLightTheme() {
            this.isDark = false
            setTheme(this.isDark)
        },
        setDarkTheme() {
            this.isDark = true
            setTheme(this.isDark)
        },
        color: getColor(),
        selectedColor: 'cyan',
        setColors,
        toggleSidbarMenu() {
            this.isSidebarOpen = !this.isSidebarOpen
        },
        isSettingsPanelOpen: false,
        openSettingsPanel() {
            this.isSettingsPanelOpen = true
            this.$nextTick(() => {
                this.$refs.settingsPanel.focus()
            })
        },
        isNotificationsPanelOpen: false,
        openNotificationsPanel() {
            this.isNotificationsPanelOpen = true
            this.$nextTick(() => {
                this.$refs.notificationsPanel.focus()
            })
        },
        isSearchPanelOpen: false,
        openSearchPanel() {
            this.isSearchPanelOpen = true
            this.$nextTick(() => {
                this.$refs.searchInput.focus()
            })
        },
        isMobileSubMenuOpen: false,
        openMobileSubMenu() {
            this.isMobileSubMenuOpen = true
            this.$nextTick(() => {
                this.$refs.mobileSubMenu.focus()
            })
        },
        isMobileMainMenuOpen: false,
        openMobileMainMenu() {
            this.isMobileMainMenuOpen = true
            this.$nextTick(() => {
                this.$refs.mobileMainMenu.focus()
            })
        },
        updateBarChart,
        updateDoughnutChart,
        updateLineChart,
    }
}

const random = (max = 100) => {
    return Math.round(Math.random() * max) + 20
}

const randomData = () => {
    return [
        random(),
        random(),
        random(),
        random(),
        random(),
        random(),
        random(),
        random(),
        random(),
        random(),
        random(),
        random(),
    ]
}
const cssColors = (color) => {
    return getComputedStyle(document.documentElement).getPropertyValue(color)
}
const getColor = () => {
    return window.localStorage.getItem('color') ?? 'cyan'
}

const colors = {
    primary: cssColors(`--color-${getColor()}`),
    primaryLight: cssColors(`--color-${getColor()}-light`),
    primaryLighter: cssColors(`--color-${getColor()}-lighter`),
    primaryDark: cssColors(`--color-${getColor()}-dark`),
    primaryDarker: cssColors(`--color-${getColor()}-darker`),
}
const activeUsersChart = new Chart(document.getElementById('activeUsersChart'), {
    type: 'bar',
    data: {
        labels: [...randomData(), ...randomData()],
        datasets: [
            {
                data: [...randomData(), ...randomData()],
                backgroundColor: colors.primary,
                borderWidth: 0,
                categoryPercentage: 1,
            },
        ],
    },
    options: {
        scales: {
            yAxes: [
                {
                    display: false,
                    gridLines: false,
                },
            ],
            xAxes: [
                {
                    display: false,
                    gridLines: false,
                },
            ],
            ticks: {
                padding: 10,
            },
        },
        cornerRadius: 2,
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        tooltips: {
            prefix: 'Users',
            bodySpacing: 4,
            footerSpacing: 4,
            hasIndicator: true,
            mode: 'index',
            intersect: true,
        },
        hover: {
            mode: 'nearest',
            intersect: true,
        },
    },
})


let randomUserCount = 0

const usersCount = document.getElementById('usersCount')

const fakeUsersCount = () => {
    randomUserCount = random()
    activeUsersChart.data.datasets[0].data.push(randomUserCount)
    activeUsersChart.data.datasets[0].data.splice(0, 1)
    activeUsersChart.update()
    usersCount.innerText = randomUserCount
}

setInterval(() => {
    fakeUsersCount()
}, 1000)
