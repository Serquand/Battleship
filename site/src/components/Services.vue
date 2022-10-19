<template>
    <section id="services">
        <h2 id="services-title">Nos services</h2>
        <div class="services-content">
            <Service 
                description="More than 10K games already played !"
                title="10K+"    
            />
            
            <Service 
                description="More than 500 players already signed up !"
                title="500+"    
            />
            
            <Service 
                description="Graded as 4.8 / 5 on Google"
                title="4.8"    
            />

            <Service 
                description="Graded as 100 / 100 at UCI, which is the higher grade for this project"
                title="100"    
            />
        </div>
    </section>
</template>

<script>
import Service from './Service.vue';

export default {
    components: {
        Service
    },
}
</script>

<style>
    #services {
        padding-top: 50px;
        margin-top: -50px;
    }

    #services-title {
        margin: 20px 0;
        font-weight: 900;
        text-align: center;
        font-weight: 900;
        font-size: 25px;
        font-style: italic;
        text-decoration: underline;
    }

    .services-content {
        gap: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
        width: 90%;
        margin: auto;
    }
</style>