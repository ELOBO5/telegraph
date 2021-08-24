document.querySelector('#post-form').addEventListener('submit', (e) => { formSubmitHandler(e) });

async function getAllPosts() {
    try {
        const response = await fetch(`http://localhost:3000/posts`);
        const data = await response.json()
        return data;
    } catch (err) {
        console.warn(err);
    }
}

async function formSubmitHandler(e) {

    try {
        const resp = await postNewPost(e);
        const allData = await getAll();
        console.log(allData);
        renderPostModal(allData.title, allData.name, allData.message);
    } catch (err) {
        renderErrorModal(err);
    }
}

function renderPost(title, name, message) {
    console.log(`${title}, ${name}, ${message}`);
    const container = `<div class="post-entry"><h1>${title}</h1><h2>${name}</h2><p>${message}</p><div>`;
    const postContainer = document.querySelector('#posts-container');

    // NOTE: Danger here. Sanitise or use something else.
    postContainer.innerHTML += container;
}

function renderErrorModal(err) {
    // DO NOTHING
}

async function postNewPost(e) {
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }

        const response = await fetch('http://localhost:3000/posts', options);

    } catch (err) {
        console.warn(err);
    }
}

async function deleteBook(id) {
    try {
        const options = { method: 'DELETE' }
        await fetch(`http://localhost:3000/books/${id}`, options);
        window.location.hash = `#books`
    } catch (err) {
        console.warn(err);
    }
}

async function refreshPageHandler() {
    const data = await getAllPosts();
    for (post of data.posts) {
        renderPost(post.title, post.name, post.message);
    }
}

refreshPageHandler();
