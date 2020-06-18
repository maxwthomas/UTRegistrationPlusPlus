import csv
from utility import Professor, Course

professors = {}

with open('grades.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        if line_count > 0:
            names = row[1].upper().split(',')
            lastname = names[0]
            if len(names) is not 1:
                names = (names[1].strip()).split(' ')
                firstname = names[0]
                middlename = names[1] if len(names) > 1 else ''
                uniqueid = Professor.generateUniqueID(firstname, lastname)
                if uniqueid not in professors:
                    professors[uniqueid] = []
                if len(professors) is 0 or (firstname + " " + lastname) not in professors[uniqueid]:
                    professors[uniqueid].append(firstname + " " + lastname)
        line_count += 1

for profid in professors:
    if len(professors[profid]) is not 1:
        print(str(profid))
        for prof in professors[profid]:
            print(prof)
