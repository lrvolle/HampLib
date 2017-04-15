import sys
import os

# dictionary keys
# primary dictionary key
doc_number_key = 'doc_number'


#secondary keys
title_key = 'title'
author_key = 'author'
pub_year_key = 'pub_year'
primary_desc_key = 'primary_call_no_desc'
primary_id_key = 'primary_call_no_id'
collection_desc_key = 'collection_desc'

secondary_keys = [title_key, author_key, pub_year_key, primary_desc_key,
					primary_id_key, collection_desc_key]

def split_line(line):
	result = []
	strng = ""
	quote = False
	for i in line:
		if(i == "\""):
			if(quote == True):
				quote = False
			else:
				quote = True
			continue
		elif(not quote):
			if(i == ','):
				result.append(strng)
				strng = ""
				continue
		strng = strng + i

	result.append(strng)

	return result 

def file_len(fname):
    with open(fname) as f:
        for i, l in enumerate(f):
            pass
    return i + 1

def parse_and_write_data(input_file, output_file):

	# secondary dictionary keys
	title_key = 'title'
	author_key = 'author'
	pub_year_key = 'pub_year'
	primary_desc_key = 'primary_call_no_desc'
	primary_id_key = 'primary_call_no_id'
	collection_desc_key = 'collection_desc'

	out_begin = output_file.split('.')[0];
	
	inlength = file_len(input_file)
	infile = open(input_file, 'r')
	outfile = open(output_file, 'w')


	beginning = '{\n\t\"data\":[\n'
	ending = '\n\t]\n}'

	outfile.write(beginning)
	
	i = 0
	files = 1
	for line in infile:
		if i == 0:
			i+=1
			continue
		# if i == 50:
		# 	break

		if(i%250 == 0):
			outfile.write(ending)
			files+=1
			outfile.close()
			outfile = open(out_begin+str(files)+'.json,', 'w')
			outfile.write(beginning)


		double_commas = ",,"

		author = True
		if line.find(double_commas) != -1:
			author = False

		columns = split_line(line)

		sub_data = {}
		doc_number = 0

		j = 0
		for column in columns:
			if j == 0:
				doc_number = column
			elif j == 1:
				sub_data[title_key] = column
			elif j == 2:
				sub_data[pub_year_key] = column
			elif j == 3:
				sub_data[author_key] = column
			elif j == 4:
				sub_data[primary_desc_key] = column
			elif j == 5:
				sub_data[primary_id_key] = column
			else:
				col = column[:len(column)-2]
				sub_data[collection_desc_key] = col
			j = j + 1

		entry = jsonify_entry(doc_number, sub_data, 2)
		if(i < inlength-1 and i%250 < 249):
			entry += ',\n'

		outfile.write(entry)



		i = i+1
	outfile.write("\n\t]\n}")

	return "success"




def print_data(data, elems):
	i = 0
	for x in data:
		if i == elems:
			break
		print(doc_number_key + ": " + str(x))
		for y in secondary_keys:
			print(y + ": " + data[x][y])
		print('\n')

		i += 1


def print_data_no_authors(data):
	for x in data:
		if not data[x][author_key] == '':
			continue
		else:
			for y in secondary_keys:
				print(y + ": " + data[x][y] + '\n'),
			print('\n')

def jsonify(key, val):
	return "\"" + key + "\":\"" + val + "\""

def jsonify_entry(doc_number, data, tabs):
	n = "\n"
	t = "\t"
	result = t*tabs + "{\n" + t*(tabs+1) + jsonify(doc_number_key, doc_number) + ',\n'

	# add data
	j = 0
	for i in secondary_keys:
		result += t*(tabs+1) + jsonify(i, data[i])
		if(j < 5):
			result += ','
		result += '\n'
		j+=1

	result += t*tabs + "}"
	return result





if __name__ == "__main__":

	# print(sys.argv[0],"is being run directly")

	basedir = os.path.abspath(os.path.dirname(__file__))

	if len(sys.argv) > 2:
		infile = os.path.join(basedir, sys.argv[1])
		outfile = os.path.join(basedir, sys.argv[2])

		result = parse_and_write_data(infile, outfile)

		print(result)
	else:
		file = 'collections1.csv'
		out = 'test.json'

		data = parse_and_write_data(file, out)


else:
	print("parse_csv.py is being imported")


