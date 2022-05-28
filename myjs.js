var triggerTabList = [].slice.call(document.querySelectorAll('#pills-tab'))
triggerTabList.forEach(function (triggerEl) {
  var tabTrigger = new bootstrap.Tab(triggerEl)

  triggerEl.addEventListener('click', function (event) {
    event.preventDefault()
    tabTrigger.show()
  })
})

var triggerEl = document.querySelector('#pills-tab a[href="#pills-profile"]')
bootstrap.Tab.getInstance(triggerEl).show() // Select tab by name