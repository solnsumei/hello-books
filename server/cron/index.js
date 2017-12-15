
import { CronJob } from 'cron';
import sendMailToDefaulters from './sendMailToDefaulters';

/**
 * Cron job scheduler,
 * useful for sending mails to users who return 
 * borrowed books late
 * Triggers the @sendMailToDefaulters function
 * 
 * @return {void}
 */
const cronJob = () => {
  const job = new CronJob('00 00 00 * * 0-6', sendMailToDefaulters,
    null,
    false, /* Start the job right now */
    'Africa/Lagos' /* Time zone of this job. */
  );

  job.start();
};

cronJob();

export default cronJob;
