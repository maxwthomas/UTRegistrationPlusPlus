from selenium import webdriver
import time

driver = webdriver.Firefox()
driver.get("https://www.ratemyprofessors.com/search.jsp?queryBy=schoolId&schoolName=University+of+Texas+at+Austin&schoolID=1255&queryoption=TEACHER")
# Close privacy popup
driver.find_element_by_xpath("/html/body/div[10]/button[2]").click()

# Load all professor entries by repeatedly clicking the load button
loadButton = driver.find_element_by_xpath("/html/body/div[3]/div[4]/div/div[1]/div/div[5]/div/div[1]")
clickable = True
while(clickable):
    try:
        driver.execute_script("arguments[0].scrollIntoView();", loadButton)
        time.sleep(.1)
        loadButton.click()
    except:
        clickable = False

# RMP says UT has 3663 professors registered, 1-based indexing HOWEVER from testing, there are actually 3653 professors
# Loop through each entry and get name, rating, numratings and tid and write to csv
f = open("rmp.csv", "w")
f.write("LastName, FirstName, tid, RMPScore, RMPNumRatings\n")
for i in range(1, 3654):
    if(i % 365 == 0): print(i/36.5,"% done")
    entry = driver.find_element_by_xpath("/html/body/div[3]/div[4]/div/div[1]/div/div[5]/ul/li[" + str(i) + "]");
    tid = ((entry.get_attribute("id"))[-7:]).strip("-")
    temp = entry.text.split("\n")
    score = temp[0]
    temp2 = temp[1].split(",")
    last = temp2[0]
    first = temp2[1].strip()
    numRatings = (temp[2].split())[0]
    f.write(last + ", " + first + ", " + tid + ", " + score + ", " + numRatings + "\n")

print("File created")
f.close()
driver.quit()
