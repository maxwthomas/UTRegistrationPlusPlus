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
        return Database.existsHelper('SELECT EXISTS(SELECT * FROM Professors WHERE id=' + str(profid) + ')')

    @staticmethod
    def courseExists(course):
        return Database.existsHelper('SELECT EXISTS(SELECT * FROM Courses WHERE semester=\'' + course.semester + '\' AND name=\'' + course.name + '\' AND a3=' + str(course.a3) + ' AND a2=' + str(course.a2) + ' AND a1=' + str(course.a1) + ' AND b3=' + str(course.b3) + ' AND b2=' + str(course.b2) + ' AND b1=' + str(course.b1) + ' AND c3=' + str(course.c3) + ' AND c2=' + str(course.c2) + ' AND c1=' + str(course.c1) + ' AND d3=' + str(course.d3) + ' AND d2=' + str(course.d2) + ' AND d1=' + str(course.d1) + ' AND f=' + str(course.f) + ')')

    @staticmethod
    def existsHelper(query):
        cur = Database.conn.cursor()
        cur.execute(query)
        result = cur.fetchone()[0]
        cur.close()
        return result
    
    @staticmethod
    def addProf(prof):
        if not Database.profExists(prof.id):
            return Database.addHelper('professors', repr(prof))
        
    @staticmethod
    def addCourse(course):
        if not Database.courseExists(course):
            return Database.addHelper('courses', repr(course))

    @staticmethod
    def addHelper(table, values):
        cur = Database.conn.cursor()
        cur.execute('INSERT INTO ' + table + ' VALUES ' + values)
        Database.conn.commit()
        cur.close()
        # TODO better return statement
        return True

class ProfessorLookup:
    # lookup table is a csv in the following format: firstinitial, firstname, middleinitial, middlename, lastinitial, lastname, ID

    def __init__(self):
        self.lookupTable = {}
        self.lastID = 10000
        self.createLookupTable()

    def createLookupTable(self):
        f = open("profIDLookup.csv", "r+")
        for line in f:
            pieces = line.strip().split(",")
            profID = int(pieces.pop(6))
            if profID > self.lastID:
                self.lastID = profID
            nameInfo = []
            for piece in pieces:
                nameInfo.append(piece)
            self.lookupTable[profID] = nameInfo
        f.close()

    def lookupProf(self, fn, mn, ln):
        fi = fn[0]
        mi = mn[0] if mn else ""
        li = ln[0]
        ids = {}
        for profID in self.lookupTable:
            ni = self.lookupTable[profID]
            if fn == ni[1] and mn == ni[3] and ln == ni[5]:
                ids[profID] = ni
        if len(ids) is 0:
            return None
        elif len(ids) is 1:
            return list(ids.keys())[0]
        else:
            print(fn + " " + mn + " " + ln + " has multiple names, please select one:")
            for profID in ids:
                ni = ids[profID]
                print(profID + ": " + ni[1] + " | " + ni[3] + " | " + ni[5])
            selected = input("Type choosen professor ID: ")
            return selected

    def addProf(self, fn, mn, ln):
        f = open("profIDLookup.csv", "a+")
        fi = fn[0]
        mi = mn[0] if mn else ""
        li = ln[0]
        newID = self.lastID + 1
        newNameInfo = [fi, fn, mi, mn, li, ln]
        self.lookupTable[newID] = newNameInfo
        f.write(",".join(newNameInfo) + "," + str(newID) + "\n")
        self.lastID = newID
        f.close()
        return newID

class Course:

    def __init__(self, name, fl, num, sem, profid, a3, a2, a1, b3, b2, b1, c3, c2, c1, d3, d2, d1, f):
        self.name = name
        self.field = fl
        self.num = num
        self.semester = sem
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
        return '(\'' + self.name + '\',\'' + self.field + '\',\'' + str(self.num) + '\',\'' + self.semester + '\',' + str(self.profid) + ',' + str(self.a3) + ',' + str(self.a2) + ',' + str(self.a1) + ',' + str(self.b3) + ',' + str(self.b2) + ',' + str(self.b1) + ',' + str(self.c3) + ',' + str(self.c2) + ',' + str(self.c1) + ',' + str(self.d3) + ',' + str(self.d2) + ',' + str(self.d1) + ',' + str(self.f) + ')'

class Professor:
    pl = ProfessorLookup()

    def __init__(self, fn, mn, ln, dep, rmps, rmprc, rmptid, sm):
       self.firstname = fn
       self.middlename = mn
       self.lastname = ln
       self.id = -1 #Professor.lookupUniqueID(fn, mn, ln)
       self.department = dep
       self.rmpscore = rmps
       self.rmpratingcount = rmprc
       self.rmptid = rmptid
       self.sexualmisconduct = sm
       self.courses = []

    def __repr__(self):
        return '(\'' + self.firstname + '\',\'' + self.middlename + '\',\'' + self.lastname + '\',' + str(self.id) + ',\'' + self.department + '\',' + str(self.rmpscore) + ',' + str(self.rmpratingcount) + ',' + str(self.rmptid) + ',\'' + str(self.sexualmisconduct) + '\')'
    
    def addCourse(self, name, fl, num, sem, a3, a2, a1, b3, b2, b1, c3, c2, c1, d3, d2, d1, f):
        course = Course(name, fl, num, sem, self.id, a3, a2, a1, b3, b2, b1, c3, c2, c1, d3, d2, d1, f)
        self.courses.append(course)

    def addToDatabase(self):
        #try:
        Database.addProf(self)
        for course in self.courses:
            Database.addCourse(course)
        #except:
            #print("Failed to add professor: " + self.firstname + " " + self.middlename + " " + self.lastname)
        #finally:
            #return
        
    def __eq__(self, other):
        if isinstance(other, Professor):
            return self.firstname == other.firstname and self.middlename == other.middlename and self.lastname == other.lastname
        return False

    @staticmethod
    def lookupUniqueID(firstName, middleName, lastName):
        return Professor.pl.lookupProf(firstName, middleName, lastName)

    @staticmethod
    def generateProfsID(professors):
        for professor in professors:
            profID = Professor.pl.lookupProf(professor.firstname, professor.middlename, professor.lastname)
            if not profID:
                profID = Professor.pl.addProf(professor.firstname, professor.middlename, professor.lastname)
            professor.id = profID
            for course in professor.courses:
                course.profid = profID
        
