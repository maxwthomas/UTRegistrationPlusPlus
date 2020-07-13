import csv
from utility import Professor, Course

professors = []

with open('grades.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        if line_count > 0:
            cname = row[4].replace("'", "")
            cfield = row[2]
            cnum = row[3]
            csem = row[0]
            cgrades = []
            for i in range(5, len(row)):
                cgrades.append(row[i])
            names = row[1].upper().replace("'", "").split(',')
            lastname = names[0]
            if len(names) is not 1:
                names = (names[1].strip()).split(' ')
                firstname = names[0]
                middlename = names[1] if len(names) > 1 else ''
            if names[0] == "[REDACTED]" or names[0] == " " or len(names) == 0 or cname == "None":
                continue
            professor = Professor(firstname, middlename, lastname, ' ', -1, -1, -1, False)
            if professor in professors: 
                for prof in professors:
                    if prof == professor: 
                        professor = prof
                        break
            else:
                professors.append(professor)
            professor.addCourse(cname, cfield, cnum, csem, cgrades[0], cgrades[1], cgrades[2], cgrades[3], cgrades[4], cgrades[5], cgrades[6], cgrades[7], cgrades[8], cgrades[9], cgrades[10], cgrades[11], cgrades[12])
        line_count += 1

Professor.generateProfsID(professors)
count = 0
onepercent = int(len(professors)/100)
for professor in professors:
    #print(professor)
    #for course in professor.courses:
        #print("\t" + repr(course))
    professor.addToDatabase()
    if(count % onepercent == 0):
        print(str(count/onepercent) + "%")
        print(count)
    count += 1

