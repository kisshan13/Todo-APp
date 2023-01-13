<script>
    import { createEventDispatcher, onMount } from "svelte";
    import Dispatcher from "./Dispatcher.svelte";

    let mobile;
    let todoText;
    let initialClick;
    let sortBy = "PENDING";

    const dispatch = createEventDispatcher();

    function getId() {
        return Math.floor(Math.random() * 10000);
    }

    function handleSortClick(sortMethod) {
        sortBy = sortMethod;

        dispatch("sortchange", {
            sortBy: sortBy
        });
    }

    function handleTodoClick() {
        if (todoText) {
            dispatch("todoadded", {
                id: getId(),
                todo: todoText
            });
        }
    }

    function handleScreen(e) {
        mobile = e.detail.isMobile;
    }

    onMount( () => {
        initialClick.click()
    })

</script>

<Dispatcher on:screen={handleScreen} />

<div class={mobile ? 'input-sec mobile' : 'input-sec'}>
    <div class={mobile ? 'input-button mobile' : 'input-button'}>
        <input
            type="text"
            class={mobile ? 'input mobile' : 'input'}
            placeholder="Write here..."
            bind:value={todoText}
        />
        <button on:click={handleTodoClick}>Add</button>
    </div>

    <div class={mobile ? 'sort-by mobile' : 'sort-by'}>
        <p>Sort by:</p>
        <div class={mobile ? 'options mobile' : 'options'}>
            <p
                class={sortBy === "COMPLETE" ? "selected" : ""}
                on:click={() => {
                    handleSortClick("COMPLETE");
                }}
            >
                Completed
            </p>
            <p
                class={sortBy === "DELETE" ? "selected" : ""}
                on:click={() => {
                    handleSortClick("DELETE");
                }}
            >
                Deleted
            </p>

            <p
                bind:this={initialClick}
                class={sortBy === "PENDING" ? "selected" : ""}
                on:click={() => {
                    handleSortClick("PENDING");
                }}
            >
                Pending
            </p>
        </div>
    </div>
</div>

<style>
    .input-sec {
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 4rem;
    }

    .input-sec.mobile{
        flex-direction: column;
        gap: 1rem;
    }

    .input-button {
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 2rem;
    }

    .input-button.mobile {
        flex-direction: column;
    }

    .input {
        width: 625px;
        height: 36px;
        border-radius: 5px;
        padding-left: 0.5rem;
    }

    .input.mobile{
        width: 250px;
    }

    .input-button button {
        border: 2px solid rgba(0, 0, 0, 0.4);
        border-radius: 5px;
        padding: 0.5rem 1rem;
        background-color: var(--ks-background-darkgreen);
    }

    .input-button button:active {
        border: 2px solid black;
    }

    .sort-by {
        display: flex;
        align-items: center;
        gap: 3rem;
    }

    .sort-by.mobile{
        gap: 1rem;
    }

    .sort-by p {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.6);
        font-weight: 500;
    }

    .options {
        display: flex;
        gap: 2rem;
    }

    .options.mobile {
        gap: 1rem
    }

    .options p {
        font-size: 16px;
        cursor: pointer;
        transition: color 100ms ease-in-out;
    }

    .options p.selected {
        font-weight: bold;
        color: rgb(0, 0, 0);
    }
</style>
