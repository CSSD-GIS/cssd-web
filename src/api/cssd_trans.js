import axios from 'axios'

import ip from '@/ip'

async function getHealthInfo(classrooms) {
    try {
        const response = await axios({
            method: 'post',
            url: `${ip.cssd_trans}/api/v1/healthcheck`,
            data: {
                classrooms: classrooms
            }
        })
        return response
    } catch (error) {
        console.error(error);
        return None
    }
}

export default {
    getHealthInfo,
}