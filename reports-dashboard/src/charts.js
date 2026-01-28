// Initialize all charts
export function initCharts() {
    setTimeout(() => {
        initPaymentChart()
        initTrendChart()
        initConversionChart()
        initResponseChart()
    }, 100)
}

// Payment Status Distribution (Pie Chart)
function initPaymentChart() {
    const ctx = document.getElementById('paymentChart')
    if (!ctx) return

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Paid', 'Not Paid', 'Not Responding'],
            datasets: [{
                data: [856, 298, 80],
                backgroundColor: [
                    '#10b981',
                    '#f59e0b',
                    '#ef4444'
                ],
                borderWidth: 0,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            family: 'Inter',
                            size: 13
                        },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        family: 'Inter',
                        size: 14
                    },
                    bodyFont: {
                        family: 'Inter',
                        size: 13
                    },
                    borderRadius: 8,
                    callbacks: {
                        label: function (context) {
                            const label = context.label || ''
                            const value = context.parsed || 0
                            const total = context.dataset.data.reduce((a, b) => a + b, 0)
                            const percentage = ((value / total) * 100).toFixed(1)
                            return `${label}: ${value} (${percentage}%)`
                        }
                    }
                }
            },
            cutout: '65%'
        }
    })
}

// Response Trends (Line Chart)
function initTrendChart() {
    const ctx = document.getElementById('trendChart')
    if (!ctx) return

    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300)
    gradient.addColorStop(0, 'rgba(102, 126, 234, 0.3)')
    gradient.addColorStop(1, 'rgba(102, 126, 234, 0)')

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Messages Sent',
                data: [280, 320, 350, 284],
                borderColor: '#667eea',
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        family: 'Inter',
                        size: 14
                    },
                    bodyFont: {
                        family: 'Inter',
                        size: 13
                    },
                    borderRadius: 8
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: 'Inter',
                            size: 12
                        },
                        padding: 10
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: 'Inter',
                            size: 12
                        },
                        padding: 10
                    }
                }
            }
        }
    })
}

// Conversion Funnel (Bar Chart)
function initConversionChart() {
    const ctx = document.getElementById('conversionChart')
    if (!ctx) return

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Total Messages', 'Responded', 'Paid', 'Conversion'],
            datasets: [{
                label: 'Conversion Funnel',
                data: [1234, 1154, 856, 856],
                backgroundColor: [
                    '#667eea',
                    '#7e91f0',
                    '#10b981',
                    '#764ba2'
                ],
                borderRadius: 10,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        family: 'Inter',
                        size: 14
                    },
                    bodyFont: {
                        family: 'Inter',
                        size: 13
                    },
                    borderRadius: 8,
                    callbacks: {
                        label: function (context) {
                            const value = context.parsed.y
                            const percentage = ((value / 1234) * 100).toFixed(1)
                            return `Count: ${value} (${percentage}%)`
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: 'Inter',
                            size: 12
                        },
                        padding: 10
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: 'Inter',
                            size: 12
                        },
                        padding: 10
                    }
                }
            }
        }
    })
}

// Response Rate Over Time (Area Chart)
function initResponseChart() {
    const ctx = document.getElementById('responseChart')
    if (!ctx) return

    const gradient1 = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300)
    gradient1.addColorStop(0, 'rgba(16, 185, 129, 0.3)')
    gradient1.addColorStop(1, 'rgba(16, 185, 129, 0)')

    const gradient2 = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300)
    gradient2.addColorStop(0, 'rgba(239, 68, 68, 0.3)')
    gradient2.addColorStop(1, 'rgba(239, 68, 68, 0)')

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Responded',
                    data: [65, 70, 75, 72, 80, 85],
                    borderColor: '#10b981',
                    backgroundColor: gradient1,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: 'Not Responding',
                    data: [35, 30, 25, 28, 20, 15],
                    borderColor: '#ef4444',
                    backgroundColor: gradient2,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#ef4444',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            family: 'Inter',
                            size: 13
                        },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        family: 'Inter',
                        size: 14
                    },
                    bodyFont: {
                        family: 'Inter',
                        size: 13
                    },
                    borderRadius: 8,
                    callbacks: {
                        label: function (context) {
                            return `${context.dataset.label}: ${context.parsed.y}%`
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: 'Inter',
                            size: 12
                        },
                        padding: 10,
                        callback: function (value) {
                            return value + '%'
                        }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: 'Inter',
                            size: 12
                        },
                        padding: 10
                    }
                }
            }
        }
    })
}
