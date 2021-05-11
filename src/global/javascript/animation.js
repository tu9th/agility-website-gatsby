

import Helper from './Helpers'
export const animationElementInnerComponent = ($elmComponent) => {
  console.log($elmComponent);

  /* return when first load */
  if (typeof window !== 'undefined' && window.firstLoad === true) {
    return false
  }
  /*  */

  let $elems = $elmComponent?.classList?.contains('animation') ? [$elmComponent] : $elmComponent?.querySelectorAll('.animation')
  let winH = window.innerHeight
  let winW = window.innerWidth
  let offset
  let add = 0
  if (winH > 1500) {
    offset = 0.7
  } else {
    offset = 0.88
  }
  if (winW > 1024) {
    let wintop = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
    if ($elems) {
      [...$elems].map($elm => {
        if ($elm.classList.contains('set-animation') && $elm.classList.contains('anima-fixed')) {
          return true
        }
        let topcoords = Helper.findOffsetTop($elm)
        if ($elm.classList.contains('mod-user-guides')) {
          add = 300
        } else {
          add = 0
        }
        if (wintop > (topcoords - (winH * offset) + add) && $elm.offsetHeight + topcoords - add - (winH * (1 - offset)) > wintop) {
          $elm.classList.add('set-animation')
        } else {
          if (topcoords + add > wintop + winH) {
            $elm.classList.remove('set-animation')
          }
        }
      })
    }
  } else {
    $elmComponent.classList.add('set-animation')
  }

  return true
}

export const animationEle = () => {
  let $elems = document.querySelectorAll('.animation')
  let winH = window.innerHeight
  let winW = window.innerWidth
  let offset
  let add = 0
  if (winH > 1500) {
    offset = 0.7
  } else {
    offset = 0.88
  }
  if (winW > 1024) {
    let wintop = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
    Array.from($elems).forEach((ele) => {
      const $elm = ele
      if ($elm.classList.contains('set-animation') && $elm.classList.contains('anima-fixed') && $elm.classList.contains('anima-inner-component')) {
        return true
      }
      let topcoords = Helper.findOffsetTop($elm)  // $elm.offsetTop + $elm.offsetParent.offsetTop
      if ($elm.classList.contains('mod-user-guides')) {
        add = 300
      } else {
        add = 0
      }
      if (wintop > (topcoords - (winH * offset) + add) && $elm.offsetHeight + topcoords - add - (winH * (1 - offset)) > wintop) {
        $elm.classList.add('set-animation')
      } else {
        // if ($elm.offsetHeight + topcoords + add < wintop ||  topcoords + add > wintop + winH) {
        //   if(topcoords + add > wintop + winH) {
        //     $elm.classList.remove('anima-revert')
        //     $elm.classList.remove('set-animation')
        //   } else {
        //     $elm.classList.add('anima-revert')
        //   }
        // }
        if (topcoords + add > wintop + winH) {
          $elm.classList.remove('set-animation')
        }
      }
      return true
    })
  } else {
    Array.from($elems).forEach((ele) => {
      const $elm = ele
      $elm.classList.add('set-animation')
    })
  }
}
const removeLoading = () => {
  document.getElementsByTagName('html')[0].classList.add('hide-loader')
  animationEle()
  // window.addEventListener('scroll', function (e) {
  //   animationEle()
  // })
  window.firstLoad = false
}
const AnimationScrollPage = () => {
  removeLoading()
  dectectEventClick()
}
const dectectEventClick = () => {
  let tagA = document.querySelectorAll('a')
  Array.from(tagA).forEach((ele) => {
    ele.addEventListener('click', (e) => {
      if (ele.getAttribute('href') === '#') {
        e.preventDefault()
      }
    })
  })
}
export default AnimationScrollPage
