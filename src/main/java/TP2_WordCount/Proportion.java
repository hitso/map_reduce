package TP2_WordCount;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.FloatWritable;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

import java.io.IOException;

/**
 * Created by Julien on 13/10/2016.
 */
public class Proportion {
    public static class TokenizerMapper
            extends Mapper<Object, Text, Text, IntWritable> {

        private final static IntWritable one = new IntWritable(1);
        private Text word = new Text();

        public void map(Object key, Text value, Context context
        ) throws IOException, InterruptedException {
            // First we get the line of data for one person
            String dataForOnePerson = new String(value.toString());
            // Then we split this line of data by ; to get the gender
            String[] data = dataForOnePerson.split(";");
            // We get the gender that is positionned at index 1 (name 0; gender 1; origin 2)
            String gender = data[1];
            word.set(gender);
            context.write(word, one);
        }
    }

    public static class IntSumReducer
            extends Reducer<Text,IntWritable,Text,FloatWritable> {
        private FloatWritable result = new FloatWritable();

        public void reduce(Text key, Iterable<IntWritable> values,
                           Context context
        ) throws IOException, InterruptedException {
            int sum = 0;
            int totalNumber = 0; // here I count the number of people
            for (IntWritable val : values) {
                sum += val.get();
                totalNumber += 1;
            }
            float percentage = (float) sum/totalNumber; //here I get the percentage of m or f
            result.set(percentage);
            context.write(key, result);
        }
    }

    public static void main(String[] args) throws Exception {
        Configuration conf = new Configuration();
        Job job = Job.getInstance(conf, "Proportion (m/f)");
        job.setJarByClass(FirstNameOrigin.class);
        job.setMapperClass(NumberFirstNameNumberOrigin.TokenizerMapper.class);
        job.setCombinerClass(NumberFirstNameNumberOrigin.IntSumReducer.class);
        job.setReducerClass(NumberFirstNameNumberOrigin.IntSumReducer.class);
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(IntWritable.class);
        FileInputFormat.addInputPath(job, new Path(args[0]));
        FileOutputFormat.setOutputPath(job, new Path(args[1]));
        System.exit(job.waitForCompletion(true) ? 0 : 1);
    }
}
