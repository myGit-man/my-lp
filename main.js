import { createClient } from 'https://cdn.skypack.dev/@sanity/client';

const client = createClient({
    projectId: '128i1gc1',
    dataset: 'production',
    useCdn: true, // `false` if you want to ensure fresh data
    apiVersion: '2024-07-19',
    token: 'skrAJ2CDUlSrvUGi5LiU8pAhEAd4QR1GSfJ8SOskNErEM0YScPMJY2OPhdFnpLITxDhWejSjF0uOi2KxUIwTb13WsujDOUdYhjXD7ctpYPWC84dJm99BlnzqBorOSZlOfeJd9oHDTeEYKBePkG5FjcctrxQFqqhqC0Uun5N1Uc6q8lXQpbR6',
});

async function getPosts() {
    const posts = await client.fetch('*[_type == "post"] | order(_createdAt desc)');
    const postsContainer = document.getElementById('posts-container');

    if (posts.length > 0) {
        postsContainer.innerHTML = ''; // Clear existing content
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            const titleElement = document.createElement('h3');
            titleElement.textContent = post.title;

            const dateElement = document.createElement('p');
            dateElement.textContent = new Date(post._createdAt).toLocaleDateString();

            // You might need to convert block content to HTML here
            // For simplicity, we'll just show the title and date

            postElement.appendChild(titleElement);
            postElement.appendChild(dateElement);
            postsContainer.appendChild(postElement);
        });
    } else {
        postsContainer.innerHTML = '<p>No posts found.</p>';
    }
}

getPosts();
