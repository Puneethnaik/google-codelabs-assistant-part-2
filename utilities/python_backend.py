import sys
import json

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
    length = len(sys.argv[1])
    print(sys.argv[1] + " " + str(length) + " ")
    print("")
if __name__ == '__main__':
    main()