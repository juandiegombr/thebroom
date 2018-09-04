<template>
    <div class="the-cards">
        <Card v-for="(card, index) in deck" :key="index" :card="card"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Card from '@/components/Card'
export default {
    name: 'TheCards',
    computed: {
        ...mapState(['deck']),
    },
    components: {
        Card
    }
}
</script>