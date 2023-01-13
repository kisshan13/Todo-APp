<!--
   This is the main event dispatcher for the application and used to dispatch the event
   which needs to access by more than 2 components.

   To listen event dispatch by this component, we need to include this component in the
   component we want to listen.
-->
<script>
    import {screen} from '../store'
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher()

    function handleResize () {
        screen.setScreen(window.screen.availWidth, window.screen.availHeight)
        dispatch('screen', {
            isMobile: screen.isMobile()
        })
    }

    function handleLoadScreen () {
        screen.setScreen(window.innerWidth, window.innerHeight)
    }

</script>

<svelte:window on:resize={handleResize} on:load={handleLoadScreen} />