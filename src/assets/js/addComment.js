import axios from 'axios';

const addCommentForm = document.getElementById( 'jsAddComment' );
const commentList = document.getElementById( 'jsCommentList' );
const commentNumber = document.getElementById( 'jsCommentNumber' );
const commentDelete = document.getElementsByClassName( 'jsCommentDelete' );

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt( commentNumber.innerHTML, 10 ) + 1;
};

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt( commentNumber.innerHTML, 10 ) - 1;
};

const addComment = (id, comment) => {
  console.log(comment);
  const li = document.createElement( 'li' );
  const span = document.createElement( 'span' );
  const spanDel = document.createElement( 'span' );
  const i = document.createElement( 'i' );
  spanDel.classList.add('jsCommentDelete');
  i.classList.add('fas','fa-trash-alt');
  span.innerHTML = comment;
  li.appendChild( span );
  span.appendChild( spanDel );
  spanDel.appendChild( i );
  spanDel.dataset.id = id;
  spanDel.addEventListener( 'click', deleteComment );
  commentList.prepend( li );
  increaseNumber();
};

const removeComment = comment => {
  decreaseNumber();
  comment.target.parentNode.parentNode.parentNode.remove();
};

const sendComment = async comment => {
  const videoId = window.location.href.split( '/videos/' )[ 1 ];
  const response = await axios( {
    url: `/api/${videoId}/comment`,
    method: 'POST',
    data: {
      comment
    }
  } );
  if ( response.status === 200 ) {
    addComment( response.data._id, comment );
  }
};

const deleteComment = async comment => {
  const videoId = window.location.href.split( '/videos/' )[ 1 ];
  console.log(comment);
  const commendId = comment.target.parentNode.dataset.id;
  const response = await axios({
    url: `/api/${videoId}/comment/${commendId}/delete`,
    method: 'POST',
    commendId
  });
  if ( response.status === 200 ) {
    removeComment(comment);
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector( 'input' );
  const comment = commentInput.value;
  sendComment( comment );
  commentInput.value = '';
};

function init() {
  addCommentForm.addEventListener( 'submit', handleSubmit );
  for (let i = 0; i < commentDelete.length; i += 1) {
        commentDelete[i].addEventListener("click", deleteComment);
    }
  
}

if ( addCommentForm ) {
  init();
}
