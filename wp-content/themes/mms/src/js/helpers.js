const getCookie = (key) => {
  const keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
  return keyValue ? keyValue[2] : null;
};

const setCookie = (key, value, time = 90) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (time * 24 * 60 * 60 * 1000))
  expires.toUTCString()

  document.cookie = key + '=' + value + ';expires=' + expires.toUTCString() + '; path=/; SameSite=Lax';
};

const handleTabindex = (wrapper, value) => {
  const clickable = Array.from(wrapper.querySelectorAll('a, button'));

  if (clickable) {
    clickable.forEach((item) => {
      item.setAttribute('tabindex', value);
    });
  }
};

const slideDown = (el, cssHeight, checkScroll = false) => {
  if (el) {
    el.classList.add('open');

    handleTabindex(el, '0');

    if (cssHeight) {
      el.style.height = cssHeight;
    } else {
      el.style.height = el.scrollHeight + 'px';
    }

    if (checkScroll) {
      if (el.scrollHeight > window.innerHeight) {
        el.classList.add('o-scroll');
      }
    }

  }
};

const updateHeight = (el) => {
  if (el) {

    // add height of all children to get the correct height
    const children = Array.from(el.children);
    let height = 0;
    children.forEach((child) => {
      height += child.scrollHeight;
    });

    el.style.height = height + 'px';
  }
};

const slideUp = (el) => {
  if (el) {
    el.style.height = '0px';

    handleTabindex(el, '-1');

    el.classList.remove('open');
    el.classList.remove('o-scroll');
  }
}

const getSiblings = (el) => {
  // for collecting siblings
  let siblings = [];
  // if no parent, return no sibling
  if (!el.parentNode) {
    return siblings;
  }
  // first child of the parent node
  let sibling = el.parentNode.firstChild;

  // collecting siblings
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== el) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};

const duplicateChildNodes = (el) => {
  NodeList.prototype.forEach = Array.prototype.forEach;
  var children = el.childNodes;
  children.forEach(function (item) {
    var cln = item.cloneNode(true);
    el.appendChild(cln);
  });
};

const calculateTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
}

export { getCookie, setCookie, slideDown, updateHeight, slideUp, getSiblings, duplicateChildNodes, calculateTime };

