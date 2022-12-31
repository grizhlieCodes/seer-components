<script lang="ts">
    export let name: string = "name", description: string = "desc", age: number = 20;

    $: console.log($$slots)
</script>


<div>
    <p>{name} + {description} = {age}</p>
    <slot name="name">

    </slot>
    <slot name="description">

    </slot>
    <slot name="age">

    </slot>
</div>