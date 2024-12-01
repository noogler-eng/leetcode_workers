import { createClient } from 'redis';
const client = createClient();

// Here kafka or load balance will it probelm or task to do it
// reduces the load of cheking the code on main server
// this are worker nodes or server, code was written only for checking the problem
const checkingSubmission = async()=>{
    const {problemId, code, language, testCases} = JSON.parse(await client.rPop("problems"));
    console.log(`Processing submission for problemId ${problemId}...`);
    console.log(`Code: ${code}`);
    console.log(`Language: ${language}`);
    await new Promise((resolve)=>resolve(setTimeout(()=>{}, 5*1000)))
    console.log(`Finished processing submission for problemId ${problemId}.`);
}

async function startServer() {
    await client.connect();
}
