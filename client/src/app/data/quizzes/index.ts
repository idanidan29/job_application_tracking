import { Question } from './types';
import { decisionTreeQuestions } from './decisionTree';
import { naiveBayesQuestions } from './naiveBayes';
import { kMeansQuestions } from './kMeans';
import { knnQuestions } from './knn';
import { randomForestQuestions } from './randomForest';
import { adaboostQuestions } from './adaboost';
import { dbscanQuestions } from './dbscan';
import { linearRegressionQuestions } from './linearRegression';
import { logisticRegressionQuestions } from './logisticRegression';

export type AlgorithmType = 'decision-tree' | 'naive-bayes' | 'k-means' | 'knn' | 'random-forest' | 'adaboost' | 'dbscan' | 'linear-regression' | 'logistic-regression';

export const quizData: Record<AlgorithmType, {
  questions: Question[];
  title: string;
}> = {
  'decision-tree': {
    questions: decisionTreeQuestions,
    title: 'Decision Tree Quiz'
  },
  'naive-bayes': {
    questions: naiveBayesQuestions,
    title: 'Naive Bayes Quiz'
  },
  'k-means': {
    questions: kMeansQuestions,
    title: 'K-Means Clustering Quiz'
  },
  'knn': {
    questions: knnQuestions,
    title: 'K-Nearest Neighbors Quiz'
  },
  'random-forest': {
    questions: randomForestQuestions,
    title: 'Random Forest Quiz'
  },
  'adaboost': {
    questions: adaboostQuestions,
    title: 'AdaBoost Quiz'
  },
  'dbscan': {
    questions: dbscanQuestions,
    title: 'DBSCAN Quiz'
  },
  'linear-regression': {
    questions: linearRegressionQuestions,
    title: 'Linear Regression Quiz'
  },
  'logistic-regression': {
    questions: logisticRegressionQuestions,
    title: 'Logistic Regression Quiz'
  }
}; 