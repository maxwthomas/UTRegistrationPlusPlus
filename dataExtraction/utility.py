import psycopg2

class Database:
    host = '3.23.233.132'
    db = 'utregplusplus'
    user = 'utrpp_admin'
    password = 'T3xas4ever!'
    conn = psycopg2.connect(host=host, database=db, user=user, password=password)

    professorRows = ["firstname", "middlename", "lastname", "id", "department", "rmpscore", "rmpratingcount", "rmptid", "sexualmisconduct"]
    courseRows = ["name", "field", "number", "semester", "uniqueid", "profid", "a3", "a2", "a1", "b3", "b2", "b1", "c3", "c2", "c1", "d3", "d2", "d1", "f"]

    @staticmethod
    def profExists(profid):
        return Database.existsHelper('SELECT EXISTS(SELECT * FROM Professors WHERE id=' + profid + ')')

    @staticmethod
    def courseExists(semester, uid):
        return Database.existsHelper('SELECT EXISTS(SELECT * FROM Courses WHERE semester=\'' + semester + '\' AND uniqueid=' + uid + ')')

    @staticmethod
    def existsHelper(query):
        cur = conn.cursor()
        cur.execute(query)
        result = cur.fetchone()[0]
        cur.close()
        return result
    
    @staticmethod
    def addProf(prof):
        if(profExists(prof.uniqueid)): return False
        return addHelper('Professors', repr(prof))
        
    @staticmethod
    def addCouse(course):
        if(courseExists(course.semester, course.uniqueid)): return False
        return addHelper('Courses', repr(course))

    @staticmethod
    def addHelper(table, values):
        cur = conn.cursor()
        cur.execute('INSERT INTO ' + table + ' VALUES ' + values)
        cur.close()
        # TODO better return statement
        return True

class Course:
    def __init__(self, name, fl, num, sem, uid, profid, a3, a2, a1, b3, b2, b1, c3, c2, c1, d3, d2, d1, f):
        self.name = name
        self.field = fl
        self.num = num
        self.semester = sem
        self.unqiueid = uid
        self.profid = profid
        self.a3 = a3
        self.a2 = a2
        self.a1 = a1
        self.b3 = b3
        self.b2 = b2
        self.b1 = b1
        self.c3 = c3
        self.c2 = c2
        self.c1 = c1
        self.d3 = d3
        self.d2 = d2
        self.d1 = d1
        self.f = f
 
    def __repr__(self):
        return '(' + self.name + ',' + self.field + ',' + self.num + ',' + self.semester + "," + self.uniqueid + ',' + self.profid + ',' + self.a3 + ',' + self.a2 + ',' + self.a1 + ',' + self.b3 + ',' + self.b2 + ',' + self.b1 + ',' + self.c3 + ',' + self.c2 + ',' + self.c1 + ',' + self.d3 + ',' + self.d2 + ',' + self.d1 + ',' + self.f + ')'

class Professor:
    def __init__(self, fn, mn, ln, dep, rmps, rmprc, rmptid, sm):
       self.firstname = fn
       self.middlename = mn
       self.lastname = ln
       self.id = Professor.generateUniqueID(fn, ln)
       self.department = dep
       self.rmpscore = rmps
       self.rmpratingcount = rmprc
       self.rmptid = rmptid
       self.sexualmisconduct = sm

    def __repr__(self):
        return '(' + self.firstname + ',' + self.middlename + ',' + self.lastname + ',' + self.id + ',' + self.department + ',' + self.rmpscore + ',' + self.rmpratingcount + ',' + self.rmptid + ',' + self.sexualmisconduct + ')'
    
    def addCourse(self, name, fl, num, sem, uid, a3, a2, a1, b3, b2, b1, c3, c2, c1, d3, d2, d1, f):
        course = Course(name, fl, num, sem, uid, self.profid, a3, a2, a1, b3, b2, b1, c3, c2, c1, d3, d2, d1, f)
        self.courses.append(course)

    def addToDatabase(self):
        Database.addProf(self)
        for course in courses:
            Database.addCourse(self)
        
    @staticmethod
    def generateUniqueID(firstName, lastName):
        name = (firstName.strip()[0] + lastName.strip()).upper()
        uniqueID = 0
        for i in range(0, len(name)):
            asci = ord(name[i])
            # true if letter in first half of alphabet
            if asci < 78 or (asci > 96 and asci < 110):
                uniqueID += asci
                name = name.upper()
            else:
                uniqueID += asci * asci
                name = name.lower()
        while(len(str(uniqueID)) < 8):
            uniqueID *= ord(name[0])
        return str(uniqueID)[0:8]

