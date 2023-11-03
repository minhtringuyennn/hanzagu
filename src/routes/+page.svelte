<script lang="ts">
	import { onMount } from 'svelte';
	import '@fortawesome/fontawesome-free/css/all.min.css';

	export let data;
	export const { rows } = data;
	let imageTrack: HTMLDivElement;

	const handleOnDown = (e: MouseEvent | Touch) =>
		(imageTrack.dataset.mouseDownAt = e.clientX as unknown as string);

	const handleOnUp = () => {
		imageTrack.dataset.mouseDownAt = '0';
		imageTrack.dataset.prevPercentage = imageTrack.dataset.percentage;
	};

	const handleOnMove = (e: MouseEvent | Touch) => {
		if (imageTrack.dataset.mouseDownAt === '0') return;

		const mouseDelta = parseFloat(imageTrack.dataset.mouseDownAt as string) - e.clientX,
			maxDelta = window.innerWidth / 2;

		const percentage = (mouseDelta / maxDelta) * -100,
			nextPercentageUnconstrained =
				parseFloat(imageTrack.dataset.prevPercentage as string) + percentage,
			nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

		imageTrack.dataset.percentage = nextPercentage as unknown as string;

		imageTrack.animate(
			{
				transform: `translate(${nextPercentage}%, -50%)`
			},
			{ duration: 1200, fill: 'forwards', easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
		);

		for (const image of imageTrack.getElementsByClassName('image')) {
			image.animate(
				{
					objectPosition: `${100 + nextPercentage}% center`
				},
				{ duration: 1200, fill: 'forwards', easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
			);
		}
	};

	onMount(() => {
		window.onmousedown = (e) => handleOnDown(e);
		window.ontouchstart = (e) => handleOnDown(e.touches[0]);
		window.onmouseup = () => handleOnUp();
		window.ontouchend = () => handleOnUp();
		window.onmousemove = (e) => handleOnMove(e);
		window.ontouchmove = (e) => handleOnMove(e.touches[0]);
	});
</script>

<body>
	<div id="splash-screen">
		<img src="favicon.png" alt="logo" />
	</div>
	<div id="image-track" data-mouse-down-at="0" data-prev-percentage="0" bind:this={imageTrack}>
		{#each rows as row}
			<a href={row.href} target="_blank" draggable="false">
				<img class="image" src={row.src} draggable="false" alt={row.alt} />
			</a>
		{/each}
	</div>
	<footer>
		<a
			href="https://www.instagram.com/hanzagu.me/"
			target="_blank"
			style="color: white; text-decoration: none;"
		>
			<i class="fab fa-instagram" /></a
		>

		<a
			href="https://www.linkedin.com/in/hanzagu/"
			target="_blank"
			style="color: white; text-decoration: none;"
		>
			<i class="fab fa-linkedin" /></a
		>

		<a
			href="https://www.behance.net/hanzagu"
			target="_blank"
			style="color: white; text-decoration: none;"
		>
			<i class="fab fa-behance" /></a
		>

		<a href="mailto:hello@hanzagu.me" target="_blank" style="color: white; text-decoration: none;">
			<i class="fa-regular fa-envelope" /></a
		>

		<a
			href="https://hanzagu.notion.site/hanzagu/Hannia-Ngo-R-sum-fae02b1abd5544948802cf540323b31e"
			target="_blank"
			style="color: white; text-decoration: none;"
		>
			<i class="fa-regular fa-file" /></a
		>
	</footer>
</body>

<style>
	body {
		height: 100vh;
		width: 100vw;
		background-color: black;
		margin: 0rem;
		overflow: hidden;
	}

	#splash-screen {
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: black;
		position: absolute;
		transform: scale(0);
		z-index: 100;
		animation: splash-screen 3s ease-in-out forwards;
		animation-delay: 0.5s;
		user-select: none;
	}

	#image-track {
		display: flex;
		gap: 5vmin;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(0%, -50%);
		user-select: none;
		opacity: 0;
		animation: show-track 0.8s ease-in-out;
		animation-delay: 3.6s;
		animation-fill-mode: forwards;
	}

	#image-track > a > .image {
		width: 40vmin;
		height: 50vmin;
		object-fit: cover;
		object-position: 100% center;
	}

	footer {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 5vmin;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2vmin;
		font-size: clamp(0.5rem, 1vmin, 1rem);
		color: white;
		opacity: 0;
		animation: show-track 0.8s ease-in-out;
		animation-delay: 3.6s;
		animation-fill-mode: forwards;
		margin-bottom: clamp(1rem, 2vmin, 3rem);
	}

	@keyframes splash-screen {
		0% {
			opacity: 0;
			transform: translate3d(0, 10%, 0);
		}
		25% {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
		80% {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
		100% {
			opacity: 0;
			transform: scale(6);
			display: none;
		}
	}

	@keyframes show-track {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
