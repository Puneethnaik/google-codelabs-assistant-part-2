import sys
import json

#import packages
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.naive_bayes import GaussianNB

class Model:
    
    def preprocess(self):
        self.df = pd.read_csv("/home/puneeth/Downloads/event_data.csv")
        self.df_1 = self.df.copy()
        l = LabelEncoder()
        self.df_1["gender"] = l.fit_transform(self.df["gender"])
        self.df_1["mood"] = l.fit_transform(self.df["mood"])
        self.df_1["event"] = l.fit_transform(self.df["event"])
        self.X = self.df_1.loc[:, self.df_1.columns != 'event']
        self.Y = self.df_1["event"]
    



    def train(self):
        self.clf = GaussianNB()
        self.clf.fit(self.X, self.Y)

    def predict(self, X):
        l_gender = LabelEncoder()
        l_gender.fit(self.df["gender"])
        X[1] = l_gender.transform([X[1]])
        try:
            l_mood = LabelEncoder()
            l_mood.fit(self.df["mood"])
            X[2] = l_mood.transform([X[2]])
        except ValueError:
            X[2] = "creative"
            l_mood = LabelEncoder()
            l_mood.fit(self.df["mood"])
            X[2] = l_mood.transform([X[2]])
        l_event = LabelEncoder()
        l_event.fit(self.df["event"])
        indices = []
        choices = self.clf.predict_proba([X]).tolist()[0]
        for i in range(len(choices)):
            item = choices[i]
            # print(item)
            if item > 0:
                indices.append([item, i])
        indices.sort()
        indices.reverse()
#         print(str(indices[0][1]) + "hd")
#         print(list(l_event.inverse_transform([indices[0][1], indices[1][1]])))
        #print(str(self.X[1]) + "->" + str(enc_gender))
        if len(indices) == 1:
            return list(l_event.inverse_transform([indices[0][1]]))
        else:    
            return list(l_event.inverse_transform([indices[0][1], indices[1][1]]))



# predict([25, 'F', 'good'])

'''
    this is the bridge between nodejs and python
    arguments made by the nodejs backend
    :argv1 : userID
    :argv2 : number of neighboring users needed
    :argv3 : number of movies
    :argv4 : the number of movies required recommended
'''

# args = read_in()
# print(args)
def main():
    # sys.stdout.write("hello hello hello hello")
    model = Model()
    model.preprocess()
    model.train()
    age = 21
    gender = 'M'

    result = model.predict([age, gender, sys.argv[1]])
    if result is None:
        print("sorry")
    elif len(result) != 0:
        print("I think you may be intrested in " + ' or '.join(result))
    else :
        print("sorry!")
    #length = len(sys.argv[1])
    #print(sys.argv[1] + " " + str(length) + " ")
    print("")
if __name__ == '__main__':
    main()